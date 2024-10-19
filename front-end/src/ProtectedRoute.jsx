import React, { Children, useEffect, useState } from 'react';
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import { LinearProgress } from '@mui/material';

const ProtectedRoute = ({}) => {

    let navigate = useNavigate()
    let [auth, setAuth] = useState({ user: false })
    let [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        (async function isAuthenticated() {
            const response = await fetch('http://localhost:3000/users/authenticated', { mode: 'cors', credentials: 'include' });
            const jsonData = await response.json()
            if (jsonData.user) {
                setAuth(prev => ({...prev, user: jsonData.user}))
                setIsLoading(false);
            }
            else{
                navigate('/login')
            }

        })();
    }, [])

    return (
        <>  
            
            {isLoading ? 
               <div
               style={{
                 textAlign: "center",
                 marginTop: "20%",  // Vertically center the content
                 marginBottom: "20%", // Add spacing at the bottom to keep it balanced
               }}
             >
               <LinearProgress
                 sx={{
                   margin: "auto",
                   width: { xs: "80%", sm: "60%", md: "40%" },
                   fontFamily: [
                    '-apple-system',
                    'BlinkMacSystemFont',
                    '"Segoe UI"',
                    'Roboto',
                    '"Helvetica Neue"',
                    'Arial',
                    'sans-serif',
                    '"Apple Color Emoji"',
                    '"Segoe UI Emoji"',
                    '"Segoe UI Symbol"',
                  ].join(',') // Responsive width for the progress bar
                 }}
               />
               <h1
                 style={{
                   color: "#90caf9",
                   marginTop: "20px",
                 }}
               >
                 Loading
               </h1>
             </div>
             
             
            : <Outlet />}
        </>
    )



};

export default ProtectedRoute;