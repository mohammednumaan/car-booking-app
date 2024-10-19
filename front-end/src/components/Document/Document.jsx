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
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { jsPDF } from "jspdf";
import dayjs from "dayjs";

export default function Document() {
  const [fullName, setFullName] = useState("");
  const [department, setDepartment] = useState("");
  const [requiredDate, setRequiredDate] = useState(null);
  const [returningDate, setReturningDate] = useState(null);
  const [placeOfVisit, setPlaceOfVisit] = useState("");
  const [vehicle, setVehicle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const doc = new jsPDF();


    doc.setFontSize(22);
    doc.text("Booking Form", 105, 20, { align: "center" });


    doc.setLineWidth(0.5);
    doc.line(10, 25, 200, 25);

    doc.setFontSize(16);
    doc.text("Personal Information", 10, 35);

    doc.setFontSize(12);
    doc.text(`Full Name: ${fullName}`, 10, 45);
    doc.text(`Department: ${department}`, 10, 55);

    doc.setFontSize(16);
    doc.text("Booking Information", 10, 70);

    doc.setFontSize(12);
    doc.text(
      `Required Date and Time: ${
        requiredDate ? dayjs(requiredDate).format("YYYY-MM-DD HH:mm") : ""
      }`,
      10,
      80
    );
    doc.text(
      `Returning Date and Time: ${
        returningDate ? dayjs(returningDate).format("YYYY-MM-DD HH:mm") : ""
      }`,
      10,
      90
    );
    doc.text(`Place of Visit: ${placeOfVisit}`, 10, 100);

    doc.setFontSize(16);
    doc.text("Vehicle Information", 10, 115);

    doc.setFontSize(12);
    doc.text(`Vehicle: ${vehicle}`, 10, 125);


    doc.setLineWidth(0.5);
    doc.line(10, 135, 200, 135);


    doc.setFontSize(10);
    doc.text("Generated on: " + dayjs().format("YYYY-MM-DD HH:mm"), 10, 145);
    doc.text("Signature: __________________________", 10, 155);

    doc.save("BookingForm.pdf");
  };

  return (
    <div className="booking-own-container">
      <div className={style["heading-div"]}>
        <h2 className={style["title"]}>
          Fill The Details To Obtain the Document
        </h2>
      </div>
      <form onSubmit={handleSubmit}>
        <div className={style["content"]}>
          <TextField
            id="full-name"
            label="Full Name"
            variant="outlined"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            sx={{
              width: { xs: "270px", sm: "300px", md: "600px" },
              marginLeft: { xs: "10px", sm: "20px" },
              marginRight: { xs: "10px", sm: "20px" },
            }}
          />
          <TextField
            id="department"
            label="Department"
            variant="outlined"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            sx={{
              width: { xs: "270px", sm: "300px", md: "600px" },
              marginLeft: { xs: "10px", sm: "20px" },
              marginRight: { xs: "10px", sm: "20px" },
            }}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer
              components={["DateTimePicker"]}
              sx={{
                width: { xs: "270px", sm: "300px", md: "600px" },
                marginLeft: { xs: "10px", sm: "20px" },
                marginRight: { xs: "10px", sm: "20px" },
              }}
            >
              <DateTimePicker
                label="Required Time and Date"
                value={requiredDate}
                onChange={(newValue) => setRequiredDate(newValue)}
              />
            </DemoContainer>
          </LocalizationProvider>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer
              components={["DateTimePicker"]}
              sx={{
                width: { xs: "270px", sm: "300px", md: "600px" },
                marginLeft: { xs: "10px", sm: "20px" },
                marginRight: { xs: "10px", sm: "20px" },
              }}
            >
              <DateTimePicker
                label="Returning Time and Date"
                value={returningDate}
                onChange={(newValue) => setReturningDate(newValue)}
              />
            </DemoContainer>
          </LocalizationProvider>

          <TextField
            id="place-of-visit"
            label="Place of visit"
            variant="outlined"
            value={placeOfVisit}
            onChange={(e) => setPlaceOfVisit(e.target.value)}
            sx={{
              width: { xs: "270px", sm: "300px", md: "600px" },
              marginLeft: { xs: "10px", sm: "20px" },
              marginRight: { xs: "10px", sm: "20px" },
            }}
          />

          <FormControl
            sx={{
              width: { xs: "270px", sm: "300px", md: "600px" },
              marginLeft: { xs: "10px", sm: "20px" },
              marginRight: { xs: "10px", sm: "20px" },
            }}
          >
            <InputLabel id="vehicle-select-label">Vehicle</InputLabel>
            <Select
              labelId="vehicle-select-label"
              id="vehicle-select"
              value={vehicle}
              onChange={(e) => setVehicle(e.target.value)}
              label="Vehicle"
            >
              <MenuItem value={"Car"}>Car</MenuItem>
              <MenuItem value={"Jeep"}>Jeep</MenuItem>
              <MenuItem value={"Van"}>Van</MenuItem>
              <MenuItem value={"Lorry"}>Lorry</MenuItem>
              <MenuItem value={"Bus"}>Bus</MenuItem>
            </Select>
          </FormControl>

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
            Download PDF
          </Button>
        </div>
      </form>
    </div>
  );
}
