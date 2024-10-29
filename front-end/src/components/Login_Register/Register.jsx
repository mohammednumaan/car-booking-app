import { useState } from "react";
import { json, Link, useNavigate } from "react-router-dom";
import "./Form.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast , Bounce } from "react-toastify";

export default function Register() {
  const [formData, setFormData] = useState({ username: "", password: "", email: "", staffID: "", phone: "" });
  const navigate = useNavigate();

  function handleFormChange(e) {
    let fieldName = e.target.name;
    let fieldValue = e.target.value;
    setFormData((prev) => ({ ...prev, [fieldName]: fieldValue }));
  }

  async function registerUser(e) {

    e.preventDefault();

    const response = await fetch("http://localhost:3000/users/register", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    const jsonData = await response.json();

    if (jsonData.registered) {
      toast.success("Registered successfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
      });

      setTimeout(() => {
        navigate("/login");
      }, 2000);

    }
    else {
      jsonData.errors.map((err) => {
        toast.error(`${err.msg}` ,{
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
        });
      })

    }
  }

  return (
    
    <div className="form">
      <ToastContainer />
      <div className="form-container">

        <div className="form-ui">
          <form onSubmit={registerUser}>
            <h2 className="form-title">R E G I S T E R</h2>
            <div className="input-field">
              <input
                onChange={handleFormChange}
                value={formData.username}
                id="username"
                name="username"
                type="text"
                required
              />
              <label htmlFor="username">Enter username</label>
            </div>
            <div className="input-field">
              <input
                onChange={handleFormChange}
                value={formData.password}
                id="password"
                name="password"
                type="password"
                required
              />
              <label htmlFor="password">Enter password</label>
            </div>
            <div className="input-field">
              <input
                onChange={handleFormChange}
                value={formData.email}
                id="email"
                name="email"
                type="email"
                required
              />
              <label htmlFor="email">Email</label>
            </div>
            <div className="input-field">
              <input
                onChange={handleFormChange}
                value={formData.staffID}
                id="staffID"
                name="staffID"
                type="number"
                required
              />
              <label htmlFor="staffID">Enter Staff ID</label>
            </div>
            <div className="input-field">
              <input
                onChange={handleFormChange}
                value={formData.phonenumber}
                id="phonenumber"
                name="phonenumber"
                type="tel"
                required
              />
              <label htmlFor="phonenumber">Enter Phone Number</label>
            </div>
            <button type="submit">Register</button>
            <div className="Create-account">
              <p>
                Already have an account? <Link to='/login'>Login</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}