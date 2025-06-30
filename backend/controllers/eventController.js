import Event from '../models/Event.js';

// Create event
export const createEvent = async (req, res) => {
  try {
    const { title, name, dateTime, location, description } = req.body;
    if (!title || !name || !dateTime || !location || !description) {
      return res.status(400).json({ message: 'Please fill all fields' });
    }

    const event = new Event({
      title,
      name,
      user: req.user._id, // from auth middleware
      dateTime,
      location,
      description,
      attendeeCount: 0,
    });

    await event.save();
    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all events (with optional search & filter)
export const getAllEvents = async (req, res) => {
  try {
    const { search, filter } = req.query;

    let query = {};

    // Search by title
    if (search) {
      query.title = { $regex: search, $options: 'i' };
    }

    // Filter by date ranges
    const now = new Date();
    let startDate, endDate;

    switch (filter) {
      case 'today':
        startDate = new Date(now.setHours(0,0,0,0));
        endDate = new Date(now.setHours(23,59,59,999));
        query.dateTime = { $gte: startDate, $lte: endDate };
        break;

      case 'thisWeek': {
        const firstDay = new Date(now.setDate(now.getDate() - now.getDay()));
        firstDay.setHours(0,0,0,0);
        const lastDay = new Date(firstDay);
        lastDay.setDate(lastDay.getDate() + 6);
        lastDay.setHours(23,59,59,999);
        query.dateTime = { $gte: firstDay, $lte: lastDay };
        break;
      }

      case 'lastWeek': {
        const firstDayLastWeek = new Date(now.setDate(now.getDate() - now.getDay() - 7));
        firstDayLastWeek.setHours(0,0,0,0);
        const lastDayLastWeek = new Date(firstDayLastWeek);
        lastDayLastWeek.setDate(lastDayLastWeek.getDate() + 6);
        lastDayLastWeek.setHours(23,59,59,999);
        query.dateTime = { $gte: firstDayLastWeek, $lte: lastDayLastWeek };
        break;
      }

      case 'thisMonth': {
        const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
        const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);
        query.dateTime = { $gte: firstDay, $lte: lastDay };
        break;
      }

      case 'lastMonth': {
        const firstDay = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        const lastDay = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59, 999);
        query.dateTime = { $gte: firstDay, $lte: lastDay };
        break;
      }
    }

    const events = await Event.find(query).sort({ dateTime: -1, createdAt: -1 });
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get events created by logged-in user
export const getMyEvents = async (req, res) => {
  try {
    const events = await Event.find({ user: req.user._id }).sort({ dateTime: -1 });
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update event (only owner)
export const updateEvent = async (req, res) => {
  try {
    const eventId = req.params.id;
    const event = await Event.findById(eventId);

    if (!event) return res.status(404).json({ message: 'Event not found' });
    if (event.user.toString() !== req.user._id.toString())
      return res.status(403).json({ message: 'Not authorized' });

    const updates = req.body;
    Object.assign(event, updates);
    await event.save();

    res.json(event);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete event (only owner)
export const deleteEvent = async (req, res) => {
  try {
    const eventId = req.params.id;
    const event = await Event.findById(eventId);

    if (!event) return res.status(404).json({ message: 'Event not found' });

    // Check ownership
    if (event.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    // Use findByIdAndDelete instead of remove
    await Event.findByIdAndDelete(eventId);

    res.json({ message: 'Event deleted' });
  } catch (error) {
    console.error("Delete Error:", error);
    res.status(500).json({ message: 'Server error' });
  }
};


// Join event (increment attendeeCount once per user)
export const joinEvent = async (req, res) => {
  try {
    const eventId = req.params.id;
    const userId = req.user._id;

    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ message: 'Event not found' });

    // If user already joined, return error
    if (event.attendees && event.attendees.includes(userId.toString())) {
      return res.status(400).json({ message: 'You already joined this event' });
    }

    // Otherwise add userId to attendees array and increment count
    event.attendees = event.attendees || [];
    event.attendees.push(userId.toString());
    event.attendeeCount = event.attendees.length;

    await event.save();

    res.json({ message: 'Joined event', attendeeCount: event.attendeeCount });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
