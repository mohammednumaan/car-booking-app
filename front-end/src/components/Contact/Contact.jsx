import { useState } from "react";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import style from "./Contact.module.css";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Add form submission logic here
  };

  return (
    <Container maxWidth="sm" className="content">
      <Box sx={{ textAlign: "center", marginTop: "100px" }}>
        <Typography
          variant="h4"
          gutterBottom
          component="h2"
          sx={{ textAlign: "center", marginTop: "20px" }}
        >
          Contact Our Admins
        </Typography>
        <hr />
        <br />

        <form onSubmit={handleSubmit} className={style.contactForm}>
          <TextField
            fullWidth
            label="Name"
            variant="outlined"
            name="name"
            size="small"
            value={formData.name}
            onChange={handleChange}
            required
            sx={{
              width: { xs: "270px", sm: "300px", md: "600px" },
              marginLeft: { xs: "10px", sm: "20px" },
              marginRight: { xs: "10px", sm: "20px" },
              padding: "none",
            }}
          />
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            name="email"
            value={formData.email}
            onChange={handleChange}
            size="small"
            type="email"
            required
            sx={{
              width: { xs: "270px", sm: "300px", md: "600px" },
              marginLeft: { xs: "10px", sm: "20px" },
              marginRight: { xs: "10px", sm: "20px" },
            }}
          />
          <TextField
            fullWidth
            label="Message"
            variant="outlined"
            name="message"
            value={formData.message}
            onChange={handleChange}
            multiline
            rows={4}
            required
            sx={{
              width: { xs: "270px", sm: "300px", md: "600px" },
              marginLeft: { xs: "10px", sm: "20px" },
              marginRight: { xs: "10px", sm: "20px" },
            }}
          />
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
            Send Message
          </Button>
        </form>
      </Box>
      <Box sx={{ mt: 4, p: 2, borderRadius: 2 }}>
        <hr />
        <Typography variant="body1" align="center">
          For booking issues or inquiries, please contact our admin. This form
          is only for reporting problems related to your vehicle booking.
          Booking requests will not be processed here.
        </Typography>
        <hr />
        <br />
        <Typography variant="h6" component="h2" gutterBottom>
          Contact Our Admins
        </Typography>
        <Typography variant="body1">
          <strong>Admin 1:</strong> Risheekesh - 1234567890
        </Typography>
        <Typography variant="body1">
          <strong>Admin 2:</strong> Numaan - 1234567890
        </Typography>
      </Box>
    </Container>
  );
}
