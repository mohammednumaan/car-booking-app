import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import style from "./Booking.module.css";
import { useState } from "react";
import axios from "axios";
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
    no_of_ppl: 1,
    imageData: {}
  })

  const handleFileUpload = (e) => {
    setFormData(prev => ({...prev, imageData: e.target.files[0]}));
  }


  const handleFormChange = (e) => {
    let fieldName = e.target.name
    let fieldValue = e.target.value
    setFormData(prev => ({...prev, [fieldName]: fieldValue}));
  }

  const handleDualChange = (e) => {
    const value = e.target.value === 'Yes' ? true : false;
    setIsDual(value);    
  } 

  const handleDualTripTimingInput = (e) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;
    const prevDualValue = formData.dualTrip;
    setFormData(prev => ({...prev, dualTrip: {...prevDualValue, [fieldName]: fieldValue}}));
  }


  const handleFormSubmit = async (e) => {
    e.preventDefault()
    let data = new FormData();
    for (let field in formData){
      data.append(field, formData[field]);
    }
    const response = await axios.post("http://localhost:3000/booking/book", formData, {withCredentials: true, headers: formData.getHeaders()})
    console.log(response)
    const jsonData = await response.json();
    if (jsonData?.message){
      setErrors(jsonData.message)
    }
  }


  return (
    <>
      <div className="booking-own-container">
        <div className={style.header}>
          <h1 className={style['title']}>Book A Car</h1>
          <h2 className={style['title']} >Secure your ride by filling in your details</h2>
        </div>

        <form id={style.form} onSubmit={handleFormSubmit} method="post" encType="multipart/form-data">
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
                sx={{
                  width: { xs: "270px", sm: "300px", md: "600px" },
                  marginLeft: { xs: "10px", sm: "20px" },
                  marginRight: { xs: "10px", sm: "20px" },
                }}
                xs = {{ width : "300px"}}
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
                  value={formData.pickLoc || " "}
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
                  value={formData.dropLoc || " "}
                  onChange={handleFormChange}
                />
              </div>
            </div>
            <div className={style["form-group"]}>
              <FormControl>
                <InputLabel id="demo-simple-select-required-label" sx={{marginLeft:"20px" }}>
                  Is it a Dual Trip?{" "}
                </InputLabel>
                <Select
                  labelId="demo-simple-select-required-label"
                  id="demo-simple-select-required"
                  label="Is it a Dual Trip?"
                  name="dualTrip"
                  value={"No"}
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

             {isDual &&
              <div className={style["form-timings"]}>
                <div className={style["form-group"]}>
                  <h4>Arrival Timings</h4>
                  <input
                    id={style.datetime}
                    type="datetime-local"
                    name="start"
                    label="Booking Timings"
                    value={formData.dualTrip.start || Date.now()}
                    onChange={handleDualTripTimingInput}
                  />
                </div>
                <div className={style["form-group"]}>
                  <h4>Departure Timings</h4>
                  <input
                    id={style.datetime}
                    type="datetime-local"
                    name="end"
                    label="Booking Timings"
                    value={formData.dualTrip.end || Date.now()}
                    onChange={handleDualTripTimingInput}

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
                sx={{
                  width: { xs: "270px", sm: "300px", md: "600px" },
                  marginLeft: { xs: "10px", sm: "20px" },
                  marginRight: { xs: "10px", sm: "20px" },
                }}

                name="reference"
                value={formData.reference || " "}
                onChange={handleFormChange}
              />
            </div>
            <div className={style["form-group"]}>
              <FormControl>
                <InputLabel id="demo-simple-select-required-label" sx={{marginLeft:"20px" }}>
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
                  value={1}
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
              </FormControl>
            </div>

            <div className={style["form-group"]}>
              <Button
                  component="label"
                  role={undefined}
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
                  name="image"
                  hidden
                />
              </Button>
            </div>
          </div>
            <div className={style["form-group"]}>
              <Button type="submit" variant="contained" color="primary"      sx={{
                  width: { xs: "270px", sm: "300px", md: "600px" },
                  marginLeft: { xs: "10px", sm: "20px" },
                  marginRight: { xs: "10px", sm: "20px" },
                }}>
                Submit
              </Button>
            </div>
        </form>
        {errors && <h1>{errors.message}</h1>}
      </div>
    </>
  );
}