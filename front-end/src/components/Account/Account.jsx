import Avatar from '@mui/material/Avatar';
import { blue } from '@mui/material/colors';
import style from "./Account.module.css";

export default function Account() {
    const profileData = {
        name: "Risheekesh",
        email: "Risheekesh@example.com",
        phone: "123456789",
        ID : "223344",
    };

    return (
        <div className={style['root-card']}>
            <div className={style['profile-card']}>
                <Avatar sx={{ bgcolor: blue[500], width: "150px", height: "150px" }}>OP</Avatar>
            </div>
            <div className={style['content-card']}>
                <h2>{profileData.name}</h2>
                <p>Staff ID : {profileData.ID}</p>
                <p>Email: {profileData.email}</p>
                <p>Phone: {profileData.phone}</p>
                
            </div>
        </div>
    );
}
