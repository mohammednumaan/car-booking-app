import { Avatar, Button } from "@mui/material";
import { blue } from "@mui/material/colors";
import style from "./Account.module.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Account() {
  const [userdata, setUser] = useState({ user: false });
  const navigate = useNavigate();

  async function isAuthenticated() {
    try {
      const response = await fetch(
        "http://localhost:3000/users/authenticated",
        {
          mode: "cors",
          credentials: "include",
        }
      );
      const jsonData = await response.json();

      if (jsonData.user) {
        setUser((prev) => ({ ...prev, ...jsonData.user }));
      }
      console.log(jsonData);
    } catch (error) {
      console.error("Error fetching authentication data", error);
    }
  }

  useEffect(() => {
    isAuthenticated();
  }, []);

  const handleLogout = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/users/sign_out",
        {
          method: "POST",
          mode: "cors",
          credentials: "include",
        }
      );
      const jsonData = await response.json();

      if (jsonData.loggedOut) {
        setUser({user: false});
        navigate("/login")

      }
    } catch (error) {
      console.error("Error fetching authentication data", error);
    }
  }

  return (
    <div className={style["root-card"]}>
      <div className={style["profile-card"]}>
        <Avatar sx={{ bgcolor: blue[500], width: "150px", height: "150px" }}>
          {userdata?.username
            ? userdata.username.slice(0, 1).toUpperCase()
            : "A"}
        </Avatar>
      </div>
      <div className={style["content-card"]}>
        <h2>{userdata?.username || "Anonymous"}</h2>
        <p>Staff ID: {userdata?.staffID || "12345"}</p>
        <p>Email: {userdata?.email || "example@example.com"}</p>
        <p>Phone: {userdata?.phonenumber || "123456789"}</p>
        <Button onClick={handleLogout}>Logout</Button>
      </div>
    </div>
  );
}