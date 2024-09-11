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
import { DateTimePicker } from "@mui/x-date-pickers";
import { pink } from "@mui/material/colors";

export default function BookOwn() {
  return (
    <>
      <div className="booking-own-container">
        <div className={style.header}>
          <h1 id={style.title}>Book A Car</h1>
          <h2>Secure your ride by filling in your details</h2>
        </div>

        <form id={style.form}>
          <div className={style["booking-form"]}>
            <div className={style["flex-row"]}>
              <div className={style["form-group"]}>
                <TextField
                  label="First Name"
                  id="outlined-size-small"
                  placeholder="John"
                  size="small"
                />
              </div>

              <div className={style["form-group"]}>
                <TextField
                  label="Last Name"
                  id="outlined-size-small"
                  placeholder="Doe"
                  size="small"
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
              />
            </div>

            <div className={style["flex-row"]}>
              <div className={style["form-group"]}>
                <TextField
                  label="Pickup Location"
                  id="outlined-size-small"
                  placeholder="Neelambur"
                  size="small"
                />
              </div>

              <div className={style["form-group"]}>
                <TextField
                  label="Drop Location"
                  id="outlined-size-small"
                  placeholder="Peelamedu"
                  size="small"
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
                  // value={age}
                  label="Is it a Dual Trip?"
                  sx={{ width: "630px" }}
                  // onChange={handleChange}
                >
                  <MenuItem value={1}>Yes</MenuItem>
                  <MenuItem value={2}>No</MenuItem>
                </Select>
                <FormHelperText>Required</FormHelperText>
              </FormControl>
            </div>
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

            <div className={style["form-group"]}>
              <TextField
                label="Reference"
                id="outlined-size-small"
                placeholder="ex : Neil Mathew"
                size="small"
                sx={{ width: "630px" }}
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
                  // value={age}
                  label="No of People"
                  sx={{ width: "630px" }}
                  // onChange={handleChange}
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
            <div className={style["form-group"]}>
              <hr />
              <Button variant="contained" color="primary">
                Submit
              </Button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
