import React from "react";
import moment from "moment";
import './BookingDecision.module.css'
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function BookingDecision() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingBookingId, setEditingBookingId] = useState(null);
  const [driverDetails, setDriverDetails] = useState({
    driverAlloted: "",
    driverNumber: "",
  });
  const navigate = useNavigate();

  

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
          setBookings(data.bookings);
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
  }, [bookings]);

  const handleDecision = async (objectId, status) => {
    if (status === "Accepted" && editingBookingId === objectId) {
      const { driverAlloted, driverNumber } = driverDetails;

      if (!driverAlloted || !driverNumber) {
        alert(
          "Both driver name and number must be provided before accepting the booking."
        );
        return;
      }

      try {
        const response = await fetch(
          "http://localhost:3000/booking/admin/confirm-reject",
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              objectId,
              status,
              driverAlloted,
              driverNumber,
            }),
          }
        );

        if (response.ok) {
          const updatedBookings = bookings.map((booking) => {
            if (booking._id === objectId) {
              return {
                ...booking,
                bookingStatus: status,
                isOnGoing: status,
                driverAlloted,
                driverNumber,
              };
            }
            return booking;
          });

          setBookings(updatedBookings);
          setEditingBookingId(null);
          setDriverDetails({ driverAlloted: "", driverNumber: "" });
        } else {
          throw new Error("Failed to update status");
        }
      } catch (error) {
        console.error(error);
      }
    } else if (status === "Rejected") {
      // Handle rejection without needing driver details
      try {
        const response = await fetch(
          "http://localhost:3000/booking/admin/confirm-reject",
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ objectId, status }),
          }
        );

        if (response.ok) {
          const updatedBookings = bookings.map((booking) => {
            if (booking._id === objectId) {
              return { ...booking, bookingStatus: status };
            }
            return booking;
          });
          // cibsike,log(updatedBookings)
          setBookings(updatedBookings);
        } else {
          throw new Error("Failed to update status");
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleEdit = (objectId) => {
    setEditingBookingId(objectId);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDriverDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/users/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        navigate("/");
      } else {
        throw new Error("Failed to logout");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="admin">
      <div className="container dashboard-section">
        <h2>Admin Dashboard</h2>
        <div className="table-responsive">
          <table className="table table-dark table-hover">
            <thead>
              <tr>
                <th scope="col">Guest Name</th>
                <th scope="col">Date</th>
                <th scope="col">Booking Timings</th>
                <th scope="col">Guest Role</th>
                <th scope="col">Reference</th>
                <th scope="col">PDF</th>
                <th scope="col">Status</th>
                <th scope="col">Driver Allotted</th>
                <th scope="col">Driver Number</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="10">Loading...</td>
                </tr>
              ) : (
                bookings.map((booking) => (
                  <tr key={booking._id}>
                    <td>{booking.first + " " + booking.last}</td>
                    <td>
                      {booking.dualTrip
                        ? moment(booking.dualTrip.start).format(
                            "DD/MM/YY h:mm A"
                          )
                        : "N/A"}
                    </td>
                    <td>
                      {booking.dualTrip
                        ? `${moment(booking.dualTrip.start).format("hh:mm A")} - ${moment(booking.dualTrip.end).format("hh:mm A")}`
                        : "N/A"}
                    </td>
                    <td>User</td>
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
                    <td>
                      {editingBookingId === booking._id ? (
                        <input
                          type="text"
                          name="driverAlloted"
                          value={driverDetails.driverAlloted}
                          onChange={handleInputChange}
                          placeholder="Enter driver name"
                        />
                      ) : (
                        booking.driverAlloted || "N/A"
                      )}
                    </td>
                    <td>
                      {editingBookingId === booking._id ? (
                        <input
                          type="text"
                          name="driverNumber"
                          value={driverDetails.driverNumber}
                          onChange={handleInputChange}
                          placeholder="Enter driver number"
                        />
                      ) : (
                        booking.driverNumber || "N/A"
                      )}
                    </td>
                    <td>
                      {editingBookingId === booking._id ? (
                        <button
                          className="btn btn-save btn-sm"
                          onClick={() =>
                            handleDecision(booking._id, "Accepted")
                          }
                        >
                          Accept
                        </button>
                      ) : (
                        <div className="admin btn-con">
                          <button
                            className="btn btn-accept btn-sm"
                            onClick={() => handleEdit(booking._id)}
                          >
                            Accept
                          </button>
                          <button
                            className="btn btn-reject btn-sm"
                            onClick={() =>
                              handleDecision(booking._id, "Rejected")
                            }
                          >
                            Reject
                          </button>
                        </div>
                      )}
                    </td>
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

export default BookingDecision;