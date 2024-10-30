import React from "react";
import {
  Typography,
  Container
} from "@mui/material";
import style from "./ContactMessages.module.css";

function ContactMessages() {
  return (
    <div className={style["content"]}>
      <Typography
        variant="h4"
        gutterBottom
        component="h2"
        sx={{ textAlign: "center" }}
      >
        Inbox Messages
      </Typography>
      <hr
        style={{ width: "600px", margin: "0 auto", border: "1px solid grey" }}
      />
      <br />
      <div className={style["message-card"]}>
        <li>
          <span className={style["color"]}> Name: </span> Risheekesh{" "}
        </li>
        <br />
        <li>
          <span className={style["color"]}> Email: </span>{" "}
          risheekeshkg@gmail.com
        </li>
        <br />
        <li><span className={style["color"]}>Message :</span></li>
        <br />
        <Container sx={{}}>
          <Typography sx={{ marginBottom: 2 }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Rhoncus
            dolor purus non enim praesent elementum facilisis leo vel. Risus at
            ultrices mi tempus imperdiet.
          </Typography>
        </Container>
      </div>
    </div>
  );
}

export default ContactMessages;
