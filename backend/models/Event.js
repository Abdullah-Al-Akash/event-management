import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  name: { type: String, required: true, trim: true }, // who posted the event
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // link to creator
  dateTime: { type: Date, required: true },
  location: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  attendeeCount: { type: Number, default: 0 },
  attendees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
}, { timestamps: true });

const Event = mongoose.model('Event', eventSchema);
export default Event;
