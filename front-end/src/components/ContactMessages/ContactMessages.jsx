import React from "react";
import {
  Typography,
  Card,
  Box,
  Stack,
} from "@mui/material";


function ContactMessages() {

  return (
    <>
      <h3 style={{ color: "lightblue", textAlign: "center" }}>
        Messages
      </h3>

      <h3
        style={{
          color: "lightblue",
          fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        }}
      >
        Inbox
      </h3>
      <Card
        variant="outlined"
        sx={{
          maxWidth: 360,
          color: "lightblue",
          backgroundColor: "#121212",
          borderStyle: "solid",
          borderColor: "lightblue",
        }}
      >
        <Box sx={{ p: 2 }}>
          <Stack
            direction="row"
            sx={{ justifyContent: "space-between", alignItems: "center" }}
          >
            <Typography gutterBottom variant="h5" component="div">
              My Name
            </Typography>
          </Stack>
          <p>myid@mail.com</p>

          <hr />
          <Typography variant="body2" sx={{ color: "white" }}>
            This is my message.
          </Typography>
        </Box>
      </Card>
    </>
  );
}
export default ContactMessages;