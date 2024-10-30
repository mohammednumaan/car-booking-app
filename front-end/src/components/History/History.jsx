import { useEffect, useState } from "react";
import style from "./History.module.css";
import {
  Typography
} from "@mui/material";
import { Divider } from "@mui/material";
import moment from "moment";
export default function History() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await fetch("http://localhost:3000/booking/history", {
        credentials: "include",
      });
      const data = await response.json();
      console.log(data);

      if (data.history.length != 0) {
        setHistory((prev) => [...data.history]);
      }
    })();
  }, []);

  return (
    <>
      {history.length !== 0 && (
        <>
          <Typography
            variant="h4"
            gutterBottom
            component="h2"
            sx={{ textAlign: "center" ,marginTop : "20px" }}
          >
            Current Bookings
          </Typography>

          {history
            .filter((data) => data.bookingStatus !== "Rejected")
            .map((data, index) => (
              <div key={data._id} className={style["container"]}>
                <p className={style["font-p"]}> Booking #{index + 1}</p>
                <Divider variant="middle" component="div" />
                <ul className={style["paper-content"]}>
                  <div className={style["li-container"]}>
                    <li>Departure: {data.pickLoc}</li>
                    <li
                      style={{
                        color:
                          data.bookingStatus == "Pending"
                            ? "yellow"
                            : data.bookingStatus == "Rejected"
                              ? "red"
                              : "green",
                      }}
                    >
                      Status of Ride: {data.bookingStatus}
                    </li>
                  </div>
                  <div className={style["li-container"]}>
                    <span style={{ whiteSpace: "nowrap" }}>
                      <li>
                        Date:{" "}
                        {moment(data.arrival).format("MMMM Do, YYYY h:mm A")}
                      </li>
                    </span>
                    <li>
                      Driver Name:{" "}
                      {!data.driverAlloted
                        ? "Not Assigned"
                        : data.driverAlloted}
                    </li>
                  </div>
                </ul>
              </div>
            ))}
        </>
      )}
      {history.length !== 0 && (
        <>
          <Typography
            variant="h4"
            gutterBottom
            component="h2"
            sx={{ textAlign: "center" ,marginTop : "20px" }}
          >
            Previous Bookings
          </Typography>
          {history
            .filter((data) => data.bookingStatus === "Rejected")
            .map((data, index) => (
              <div key={data._id} className={style["container"]}>
                <p className={style["font-p"]}> Booking #{index + 1}</p>
                <Divider variant="middle" component="div" />
                <ul className={style["paper-content"]}>
                  <div className={style["li-container"]}>
                    <li>Departure: {data.pickLoc}</li>
                    <li
                      style={{
                        color:
                          data.bookingStatus == "Pending"
                            ? "yellow"
                            : data.bookingStatus == "Rejected"
                              ? "red"
                              : "green",
                      }}
                    >
                      Status of Ride: {data.bookingStatus}
                    </li>
                  </div>
                  <div className={style["li-container"]}>
                    <span style={{ whiteSpace: "nowrap" }}>
                      <li>
                        Date:{" "}
                        {moment(data.arrival).format("MMMM Do, YYYY h:mm A")}
                      </li>
                    </span>
                    <li>
                      Driver Name:{" "}
                      {!data.driverAlloted
                        ? "Not Assigned"
                        : data.driverAlloted}
                    </li>
                  </div>
                </ul>
              </div>
            ))}
        </>
      )}
    </>
  );
}
