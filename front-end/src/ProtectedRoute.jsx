import React, { Children, useEffect, useState } from 'react';
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';

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
            
            {isLoading ? <h1 style={{textAlign: 'center'}}>Loading...</h1> : <Outlet />}
        </>
    )



};

export default ProtectedRoute;