import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import style from "./Booking.module.css";
import { useState } from "react";

export default function BookOwn() {

  const [isDual, setIsDual] = useState(false);
  const [errors, setErrors] = useState("");
  const [formData, setFormData] = useState({
    first: "",
    last: "",
    email: "",
    pickLoc: "",
    dropLoc: "",
    dualTrip: {start: "", end: ""},
    reference: "",
    no_of_ppl: "",
    uploadStr: "test"
  })

  const handleFormChange = (e) => {
    let fieldName = e.target.name
    let fieldValue = e.target.value
    setFormData(prev => ({...prev, [fieldName]: fieldValue}));
  }

  const handleDualChange = (e) => {
    const value = e.target.value === 'Yes' ? true : false;
    setIsDual(value);    
  } 

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    const response = await fetch("http://localhost:3000/booking/book", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    const jsonData = await response.json();
    if (jsonData?.message){
      setErrors(jsonData.message)
    }
    console.log(jsonData, formData)
  }


  return (
    <>
      <div className="booking-own-container">
        <div className={style.header}>
          <h1 id={style.title}>Book A Car</h1>
          <h2>Secure your ride by filling in your details</h2>
        </div>

        <form id={style.form} onSubmit={handleFormSubmit}>
          <div className={style["booking-form"]}>
            <div className={style["flex-row"]}>
              <div className={style["form-group"]}>
                <TextField
                  label="First Name"
                  id="outlined-size-small"
                  placeholder="John"
                  size="small"
                  name="first"
                  onChange={handleFormChange}
                />
              </div>

              <div className={style["form-group"]}>
                <TextField
                  label="Last Name"
                  id="outlined-size-small"
                  placeholder="Doe"
                  size="small"
                  name="last"
                  onChange={handleFormChange}


                />
              </div>
            </div>

            <div className={style["form-group"]}>
              <TextField
                label="Email"
                id="outlined-size-small"
                placeholder="example@example.com"
                size="small"
                color="#90caf9"
                sx={{ width: "630px" }}
                name="email"
                onChange={handleFormChange}


              />
            </div>

            <div className={style["flex-row"]}>
              <div className={style["form-group"]}>
                <TextField
                  label="Pickup Location"
                  id="outlined-size-small"
                  placeholder="Neelambur"
                  size="small"
                  name="pickLoc"
                  onChange={handleFormChange}


                />
              </div>

              <div className={style["form-group"]}>
                <TextField
                  label="Drop Location"
                  id="outlined-size-small"
                  placeholder="Peelamedu"
                  size="small"
                  name="dropLoc"
                  onChange={handleFormChange}
                />
              </div>
            </div>
            <div className={style["form-group"]}>
              <FormControl>
                <InputLabel id="demo-simple-select-required-label">
                  Is it a Dual Trip?{" "}
                </InputLabel>
                <Select
                  labelId="demo-simple-select-required-label"
                  id="demo-simple-select-required"
                  label="Is it a Dual Trip?"
                  sx={{ width: "630px" }}
                  onChange={handleDualChange}
                >
                  <MenuItem value={"Yes"}>Yes</MenuItem>
                  <MenuItem value={"No"}>No</MenuItem>
                </Select>
              </FormControl>
            </div>

             {isDual &&
              <div className={style["form-timings"]}>
                <div className={style["form-group"]}>
                  <h4>Arrival Timings</h4>
                  <input
                    id={style.datetime}
                    type="datetime-local"
                    name="datetime"
                    label="Booking Timings"
                    value={Date.now()}
                  />
                </div>
                <div className={style["form-group"]}>
                  <h4>Departure Timings</h4>
                  <input
                    id={style.datetime}
                    type="datetime-local"
                    name="datetime"
                    label="Booking Timings"
                    value={Date.now()}
                  />
                </div>
              </div>
            }

            <div className={style["form-group"]}>
              <TextField
                label="Reference"
                id="outlined-size-small"
                placeholder="ex : Neil Mathew"
                size="small"
                sx={{ width: "630px" }}
                name="reference"
                onChange={handleFormChange}
              />
            </div>
            <div className={style["form-group"]}>
              <FormControl>
                <InputLabel id="demo-simple-select-required-label">
                  No of People{" "}
                </InputLabel>
                <Select
                  labelId="demo-simple-select-required-label"
                  id="demo-simple-select-required"
                  label="No of People"
                  sx={{ width: "630px" }}
                  name="no_of_ppl"
                  onChange={handleFormChange}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={1}>1</MenuItem>
                  <MenuItem value={2}>2</MenuItem>
                  <MenuItem value={3}>3</MenuItem>
                  <MenuItem value={4}>4</MenuItem>
                </Select>
                <FormHelperText>Required</FormHelperText>
              </FormControl>
            </div>

            <div className={style["form-group"]}>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label="Check Availbility of The Vehicle"
                />
              </FormGroup>
              <br />
              <Button variant="outlined">Check</Button>
            </div>
            <div className={style["form-group"]}>
              <h4> Upload Proof Of Acceptance of Ride </h4>
              <Button
                component="label"
                role={undefined}
                variant="outlined"
                tabIndex={-1}
                // startIcon={<CloudUploadIcon />}
              >
                Upload files
                {/* <VisuallyHiddenInput
                  type="file"
                  onChange={(event) => console.log(event.target.files)}
                  multiple
                /> */}
              </Button>
            </div>
          </div>
            <div className={style["form-group"]}>
              <hr />
              <Button type="submit" variant="contained" color="primary">
                Submit
              </Button>
            </div>
        </form>
        {errors && <h1>{errors}</h1>}
      </div>
    </>
  );
}
