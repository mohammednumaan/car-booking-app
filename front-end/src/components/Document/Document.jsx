import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import style from "./Document.module.css";
import { useState } from "react";
import axios from "axios";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

export default function Document() {
  return (
    <div className="booking-own-container">
      <div className={style["heading-div"]}>
        <h2 className={style["title"]}>
          Fill The Details To Obtain the Document
        </h2>
      </div>
      <div className={style["content"]}>
        <TextField
          id="outlined-basic"
          label="Full Name"
          variant="outlined"
          sx={{ width: "600px" }}
        />
        <TextField
          id="outlined-basic"
          label="Department"
          variant="outlined"
          sx={{ width: "600px" }}
        />

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DateTimePicker"]}>
            <DateTimePicker label="Required Time and Date " />
          </DemoContainer>
        </LocalizationProvider>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DateTimePicker"]}>
            <DateTimePicker label="Returning Time and Date" />
          </DemoContainer>
        </LocalizationProvider>
        <TextField
          id="outlined-basic"
          label="Place of visit"
          variant="outlined"
          sx={{ width: "600px" }}
        />
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          s
          value={10}
          label="Car"
        >
          <MenuItem value={10}>Car</MenuItem>
          <MenuItem value={20}>Jeep</MenuItem>
          <MenuItem value={30}>Van</MenuItem>
          <MenuItem value={30}>Lorry</MenuItem>
          <MenuItem value={30}>Bus</MenuItem>
        </Select>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{
            width: { xs: "270px", sm: "300px", md: "600px" },
          }}
        >
          Download PDF
        </Button>
      </div>
    </div>
  );
}
