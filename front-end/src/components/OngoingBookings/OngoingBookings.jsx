import React from "react";
import moment from "moment";
import './OngoingBookings.module.css';
import { useState, useEffect } from "react";

function OngoingBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/booking/admin/on-going",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          console.log(data);


          const ongoingBookings = data.bookings.filter((booking) => {
            const currentTime = moment();
            const startTime = moment(booking.arrival);
            const endTime = moment(booking.dualTrip?.end);

            
            return (
              startTime.isValid() &&
              endTime.isValid() &&
              currentTime.isBetween(startTime, endTime) &&
              booking.driverAlloted 
            );
          });

          setBookings(ongoingBookings);
        } else {
          throw new Error("Failed to fetch bookings");
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div className="admin">
      <div className="container dashboard-section">
        <h2>Ongoing Bookings</h2>
        <div className="table-responsive">
          <table className="table table-dark table-hover">
            <thead>
              <tr>
                <th scope="col">Guest Name</th>
                <th scope="col">Date</th>
                <th scope="col">Booking Timings</th>
                <th scope="col">Reference</th>
                <th scope="col">PDF</th>
                <th scope="col">Status</th>
                <th scope="col">Driver Allotted</th>
                <th scope="col">Driver Number</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="8">Loading...</td>
                </tr>
              ) : (
                bookings.map((booking) => (
                  <tr key={booking._id}>
                    <td>{booking.first + " " + booking.last}</td>
                    <td>
                      {booking.arrival
                        ? moment(booking.arrival).format(
                            "DD/MM/YY h:mm A"
                          )
                        : "N/A"}
                    </td>
                    <td>
                      {booking.dualTrip && booking.arrival
                        ? `${moment(booking.arrival).format("hh:mm A")} - ${moment(booking.dualTrip.end).format("hh:mm A")}`
                        : "N/A"}
                    </td>
                    <td>{booking.reference || "N/A"}</td>
                    <td>
                      {booking.img ? (
                        <a
                          href={`http://localhost:3000/admin/${booking.img}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View PDF
                        </a>
                      ) : (
                        "No PDF"
                      )}
                    </td>
                    <td>{booking.bookingStatus}</td>
                    <td>{booking.driverAlloted || "N/A"}</td>
                    <td>{booking.driverNumber || "N/A"}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default OngoingBookings;
