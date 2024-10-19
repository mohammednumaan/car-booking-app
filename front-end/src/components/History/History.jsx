import style from "./History.module.css";
import { Divider } from "@mui/material";

export default function History() {
  return (
    <div className={style["container"]}>
      <p className={style["font-p"]}> Booking #2734</p>
      <Divider variant="middle" component="div" />
      <ul className={style["paper-content"]}>
        <div className={style["li-container"]}>
          <li>Departure: 12:00 PM</li>
          <li>Status of Ride: Pending</li>
        </div>
        <div className={style["li-container"]}>
          <span style={{ whiteSpace: "nowrap" }}>
            <li>Date: 2022-02-20</li>
          </span>
          <li>Driver Name: John Doe</li>
        </div>
      </ul>
    </div>
  );
}
