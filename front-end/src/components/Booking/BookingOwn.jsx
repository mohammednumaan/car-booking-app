import React, { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import {
  Button,
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { ToastContainer, toast} from "react-toastify";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import style from "./Booking.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function BookOwn() {

  
  const navigate = useNavigate();
  const [isDual, setIsDual] = useState(false);
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    pickLoc: "",
    dropLoc: "",
    arrival: dayjs(), 
    departure: "",
    reference: "",
    no_of_ppl: 1,
    vehical: 'Car',
    imageData: {},
  });

  const handleFileUpload = (e) => {
    setFormData((prev) => ({ ...prev, imageData: e.target.files[0] }));
  };

  const handleFormChange = (e) => {
    let fieldName = e.target.name;
    let fieldValue = e.target.value;
    setFormData((prev) => ({ ...prev, [fieldName]: fieldValue }));
  };

  // const handleDateChange = (newValue) => {
  //   setFormData((prev) => ({ ...prev, arrival: newValue }));
  // };

  const handleDualChange = () => {
    setIsDual(!isDual);
  };


  const handleFormSubmit = async (e) => {
    e.preventDefault();
    let data = new FormData();
    for (let field in formData) {
      data.append(field, formData[field]);

    }
    
    const response = await axios.post(
      "http://localhost:3000/booking/book",
      data,
      { withCredentials: true }
    );


    if (response?.data.booked) {
      toast.success("Booking successful!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      setTimeout(() => {
        navigate("/history");
      }, 2000);

    } else {

      if (response.data?.errors?.length){
        response.data.errors.map(err => {
          toast.error(`${err.msg}`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        })
      } 
      
      else{
        toast.error(`${!response.data.fileError ? "Booking failed, please try again (This Could Be a Network Issue)!" : response.data.fileError}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
      
    }
  };

  return (
    <>
      <ToastContainer />

      <div className="booking-own-container">
        <div className={style.header}>
          <h1 className={style["title"]}>Book Your Transport</h1>
          {/* <h2 className={style["title"]}>
            Secure your ride by filling in your details
          </h2> */}
        </div>

        <form
          id={style.form}
          onSubmit={handleFormSubmit}
          method="post"
          encType="multipart/form-data"
        >
          <div className={style["booking-form"]}>
            <div className={style["flex-row"]}>
              <div className={style["form-group"]}>
                <TextField
                  label="Full Name"
                  id="outlined-size-small"
                  placeholder="John Doe"
                  size="small"
                  name="fullname"
                  value={formData.fullname}
                  onChange={handleFormChange}
                  required
                  sx={{
                    width: { xs: "270px", sm: "300px", md: "600px" },
                    marginLeft: { xs: "10px", sm: "20px" },
                    marginRight: { xs: "10px", sm: "20px" },
                    backgroundColor: "transparent",
                  }}

                />
              </div>
            </div>
            <div className={style["flex-row"]}>
              <div className={style["form-group"]}>
                <TextField
                  label="Pickup Location"
                  id="outlined-size-small"
                  placeholder="Neelambur"
                  size="small"
                  name="pickLoc"
                  value={formData.pickLoc || " "}
                  onChange={handleFormChange}
                  required

                />
              </div>

              <div className={style["form-group"]}>
                <TextField
                  label="Drop Location"
                  id="outlined-size-small"
                  placeholder="Peelamedu"
                  size="small"
                  name="dropLoc"
                  value={formData.dropLoc || " "}
                  onChange={handleFormChange}
                  required

                />
              </div>
            </div>

            <div className={style["form-group"]}>
              <TextField
                label="Email"
                type="email"
                id="outlined-size-small"
                placeholder="example@example.com"
                size="small"
                color="#90caf9"
                sx={{
                  width: { xs: "270px", sm: "300px", md: "600px" },
                  marginLeft: { xs: "10px", sm: "20px" },
                  marginRight: { xs: "10px", sm: "20px" },
                  backgroundColor: "transparent",
                }}
                name="email"
                value={formData.email}
                onChange={handleFormChange}
                required

              />
            </div>
            <div className={style["form-group"]}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  label="Arrival Timings"
                  value={formData.arrival || dayjs()}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </div>

            <div className={style["form-group"]}>
              <FormControl>
                <InputLabel
                  id="demo-simple-select-required-label"
                  sx={{ marginLeft: "20px" }}
                >
                  Is it a Dual Trip?{" "}
                </InputLabel>
                <Select
                  labelId="demo-simple-select-required-label"
                  id="demo-simple-select-required"
                  label="Is it a Dual Trip?"
                  value={!isDual ? "No" : "Yes"}
                  sx={{
                    width: { xs: "270px", sm: "300px", md: "600px" },
                    marginLeft: { xs: "10px", sm: "20px" },
                    marginRight: { xs: "10px", sm: "20px" },
                  }}
                  onChange={handleDualChange}
                  
                >
                  <MenuItem value={"Yes"}>Yes</MenuItem>
                  <MenuItem value={"No"}>No</MenuItem>
                </Select>
              </FormControl>
            </div>

            {isDual && (
              <div className={style["form-timings"]}>
                <div className={style["form-group"]}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker
                    
                      label="Departure Timings"
                      value={isDual && dayjs()}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                </div>
              </div>
            )}

            <div className={style["form-group"]}>
              <TextField
                label="Reference"
                id="outlined-size-small"
                placeholder="Mr. John Doe"
                size="small"
                sx={{
                  width: { xs: "270px", sm: "300px", md: "600px" },
                  marginLeft: { xs: "10px", sm: "20px" },
                  marginRight: { xs: "10px", sm: "20px" },
                }}
                name="reference"
                value={formData.reference || " "}
                onChange={handleFormChange}
                required

              />
            </div>

            <div className={style["form-group"]}>
              <FormControl>
                <InputLabel
                  id="demo-simple-select-required-label"
                  sx={{ marginLeft: "20px" }}
                >
                  No of People{" "}
                </InputLabel>
                <Select
                  labelId="demo-simple-select-required-label"
                  id="demo-simple-select-required"
                  label="No of People"
                  sx={{
                    width: { xs: "270px", sm: "300px", md: "600px" },
                    marginLeft: { xs: "10px", sm: "20px" },
                    marginRight: { xs: "10px", sm: "20px" },
                  }}
                  name="no_of_ppl"
                  value={formData.no_of_ppl}
                  onChange={handleFormChange}
                >
                  <MenuItem value="1">
                  </MenuItem>
                  <MenuItem value={1}>1</MenuItem>
                  <MenuItem value={2}>2</MenuItem>
                  <MenuItem value={3}>3</MenuItem>
                  <MenuItem value={4}>4</MenuItem>
                </Select>
              </FormControl>
            </div>

            <div className={style["form-group"]}>
              <FormControl>
                <InputLabel
                  id="demo-simple-select-required-label"
                  sx={{ marginLeft: "20px" }}
                >
                  Vehical Type{" "}
                </InputLabel>
                <Select
                  labelId="demo-simple-select-required-label"
                  id="demo-simple-select-required"
                  label="Vehical Type"
                  sx={{
                    width: { xs: "270px", sm: "300px", md: "600px" },
                    marginLeft: { xs: "10px", sm: "20px" },
                    marginRight: { xs: "10px", sm: "20px" },
                  }}
                  name="vehical"
                  value={formData.vehical}
                  onChange={handleFormChange}
                >
                  <MenuItem value="Car">
                  </MenuItem>
                  <MenuItem value={"Car"}>Car</MenuItem>
                  <MenuItem value={"Van"}>Van</MenuItem>
                  <MenuItem value={"Bus"}>Bus</MenuItem>
                </Select>
              </FormControl>
            </div>

            <div className={style["form-group"]}>
              <Button
                component="label"
                variant="outlined"
                tabIndex={-1}
                sx={{
                  width: { xs: "270px", sm: "300px", md: "600px" },
                  marginLeft: { xs: "10px", sm: "20px" },
                  marginRight: { xs: "10px", sm: "20px" },
                }}
              >
                Upload Proof Of Reference
                <input
                  type="file"
                  onChange={handleFileUpload}
                  name="imageData"
                  hidden
                />
              </Button>
            </div>
          </div>

          <div className={style["form-group"]}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{
                width: { xs: "270px", sm: "300px", md: "600px" },
                marginLeft: { xs: "10px", sm: "20px" },
                marginRight: { xs: "10px", sm: "20px" },
              }}
            >
              Submit
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
