import style from "./History.module.css";
import { Divider } from "@mui/material";


export default function History() {
  return (
    <div class={style["container"]}>
      <p class={style["font-p"]}>Booking #2734 </p>
      <Divider variant="middle" component="div" />
      <ul class={style["paper-content"]}>
        <div class={style["li-container"]}>
          <li>Departure : Time  12:00 PM</li>
          <li>Status of Ride : Pending </li>
        </div>
        <div class={style["li-container"]}>
          <li>Date  : 2022-02-20</li>
          <li>Driver  Name : John Doe</li>

        </div>
      </ul>
    </div>
  );
}
