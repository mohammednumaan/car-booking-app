import {
  Route,
  RouterProvider,
  Routes,
  createBrowserRouter,
} from "react-router-dom";

import routes from "../routes";
import Login from "./components/Login/Login";
import Dashboard from "./components/UserDashboard/Dashboard";
import Register from "./components/Register/Register";
import ProtectedRoute from "./ProtectedRoute";
import { useEffect, useState } from "react";
import BookOwn from "./components/Booking/BookingOwn";
import PrimaryComponent from "./components/UserDashboard/Dashboard";

function App() {
  let [user, setUser] = useState({ user: false });

  useEffect(() => {
    (async function isAuthenticated() {
      const response = await fetch(
        "http://localhost:3000/users/authenticated",
        { mode: "cors", credentials: "include" }
      );
      const jsonData = await response.json();
      if (jsonData.user) {
        setUser((prev) => ({ ...prev, user: jsonData.user }));
      }
    });
  }, []);

  return (
    <Routes>
      <Route index element={<Register />} />
      <Route path="register" element={<Register />} />
      <Route path="login" element={<Login />} />

      <Route element={<ProtectedRoute user={user.user} />}>
        <Route
          path="dashboard"
          element={<PrimaryComponent children={<Dashboard />} />}
        />
        <Route
          path="book-own"
          element={<PrimaryComponent children={<BookOwn />} />}
        />
      </Route>
    </Routes>
  );
}

export default App;
