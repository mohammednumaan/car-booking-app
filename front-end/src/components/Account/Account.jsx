import { Avatar } from "@mui/material";
import { blue } from "@mui/material/colors";
import style from "./Account.module.css";
import { useState, useEffect } from "react";

export default function Account() {
  const [userdata, setUser] = useState({ user: false });

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
      </div>
    </div>
  );
}