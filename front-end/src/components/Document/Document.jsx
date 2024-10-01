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

export default function Document(){
    return (

        <div className="booking-own-container">
        <div className={style.header}>
          <h1 className={style['title']}>Book A Car</h1>
          <h2 className={style['title']} >Secure your ride by filling in your details</h2>
        </div>
        </div>
    );
}