import {
  Route,
  Routes,
} from "react-router-dom";

import Dashboard from "./components/UserDashboard/Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import { useEffect, useState } from "react";
import BookOwn from "./components/Booking/BookingOwn";
import PrimaryComponent from "./components/UserDashboard/Dashboard";
import Register from "./components/Login_Register/Register";
import Login from "./components/Login_Register/Login";
import History from "./components/History/History";
import Account from "./components/Account/Account";
import Document from "./components/Document/Document";


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
        <Route
          path="history"
          element={<PrimaryComponent children={<History />} />}
        />
        <Route
          path="account"
          element={<PrimaryComponent children={<Account />} />}
        />

        <Route
          path="document"
          element={<PrimaryComponent children={<Document />} />}
        />
      </Route>
    </Routes>
  );
}


export default App;
