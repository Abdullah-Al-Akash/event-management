import { Routes, Route, Navigate } from "react-router-dom";
import RootLayout from "../layouts/RootLayout";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
// import Events from "../pages/Events";
// import AddEvent from "../pages/AddEvent";
// import MyEvents from "../pages/MyEvents";
import PrivateRoute from "./PrivateRoute";


export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        {/* Public routes */}
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route index element={<Navigate to="/home" />} />

        {/* Private routes wrapped with PrivateRoute */}
        {/* <Route
          path="/events"
          element={
            <PrivateRoute>
              <Events />
            </PrivateRoute>
          }
        />
        <Route
          path="/add-event"
          element={
            <PrivateRoute>
              <AddEvent />
            </PrivateRoute>
          }
        />
        <Route
          path="/my-events"
          element={
            <PrivateRoute>
              <MyEvents />
            </PrivateRoute>
          }
        /> */}

        {/* Optional catch all */}
        <Route path="*" element={<Navigate to="/home" />} />
      </Route>
    </Routes>
  );
}
