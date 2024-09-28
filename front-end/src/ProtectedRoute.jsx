import React, { Children, useEffect, useState } from 'react';
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import { blue } from '@mui/material/colors';

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
                <div style={{textAlign:"center",margin: 300}}>
                    <CircularProgress />
                    <h1 style={{color : "#90caf9"}}>Loading 
                    </h1>
                </div>
            : <Outlet />}
        </>
    )



};

export default ProtectedRoute;