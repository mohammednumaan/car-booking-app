import { useEffect, useState } from "react";
import style from "./History.module.css";
import { Divider } from "@mui/material";

export default function History() {

  const [history, setHistory] = useState([]);
  
  useEffect(() => {
    (async () => {
      console.log('hi')
      const response = await fetch('http://localhost:3000/booking/history', {credentials: 'include'});
      const data = await response.json();
      console.log(data)

      if (data.history.length != 0){
        setHistory((prev) => ([...data.history]));
      }
    })();
  }, [])
  console.log(history)
  return (
    <>
      {history.length && (
        <>
          {history.map((data, index) => (
            <>
              <div className={style["container"]}>
                <p className={style["font-p"]}> Booking #{index + 1}</p>
                <Divider variant="middle" component="div" />
                <ul className={style["paper-content"]}>
                  <div className={style["li-container"]}>
                    <li>Departure: {data.pickLoc}</li>
                    <li style={{color: data.isOnGoing ? 'yellow' : 'red'}}>Status of Ride: {data.isOnGoing ? 'In Progress' : 'Completed'}</li>
                  </div>
                  <div className={style["li-container"]}>
                    <span style={{ whiteSpace: "nowrap" }}>
                      <li>Date: 2022-02-20</li>
                    </span>
                    <li>Driver Name: {!data.driver ? "Not Assigned" : data.driver}</li>
                  </div>
                </ul>
              </div>
            </>
            
          ))}
        </>

      )}
    </>
  );
}
