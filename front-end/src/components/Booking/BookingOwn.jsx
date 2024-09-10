import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material"
import style from "./Booking.module.css"
import { DateTimePicker } from "@mui/x-date-pickers"

export default function BookOwn(){
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
                        sx={{width : "630px"}}
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
                        <input
                            id={style.datetime}
                            type="datetime-local"
                            name="datetime"
                            value="2017-06-01T08:30" />
                    </div>
                    
                    <div className={style["form-group"]}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Is it Dual Trip?</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={0}
                            label="Is it Dual Trip?"
                            sx={{width : "630px"}}

                            // onChange={handleChange}
                        >
                        <MenuItem value={1}>Yes</MenuItem>
                        <MenuItem value={0}>No</MenuItem>s
                        </Select>
                        </FormControl>
                    </div>
                    </div>
                </form>
            </div>
        </>
    )
}