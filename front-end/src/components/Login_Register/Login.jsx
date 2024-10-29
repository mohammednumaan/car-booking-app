import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import './Form.css'
import { toast, ToastContainer } from "react-toastify";


export default function Login(){
    const [formData, setFormData] = useState({username: "", password: ""});
    const navigate = useNavigate();


    function handleFormChange(e){
        let fieldName = e.target.name
        let fieldValue = e.target.value
        setFormData(prev => ({...prev, [fieldName]: fieldValue}));

    }


    async function loginUser(e){
        e.preventDefault()
        const response = await fetch("http://localhost:3000/users/login", {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: {'Content-Type': 'application/json'},
            credentials: 'include'
        });
        const jsonData = await response.json();
        if (jsonData.login){
            navigate('/dashboard', {state: {user: jsonData.login}})
        } else{
            console.log(jsonData)
            toast.error(jsonData.error, {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
        }

    }

    return (
        <div className="form">    
            <ToastContainer />        
            <div className="form-container">
                <div className="form-ui">
                    <form onSubmit={loginUser}>

                        <h2 className="form-title">L O G I N</h2>
                        <div className="input-field">
                            <input onChange={handleFormChange} value={formData.username} id="username" name="username" type="text" required />
                            <label htmlFor="username">Enter username</label>
                        </div>
                        <div className="input-field">
                            <input onChange={handleFormChange} value={formData.password} id= "password" name="password" type="password" required />
                            <label htmlFor="password">Enter password</label>
                        </div>
                        <button type="submit">Login</button>
                        <div className="Create-account">
                            <p>Create An Account? <Link to='/register'>Register</Link></p>
                        </div>
                    </form>
                     </div>
                </div>
            </div>
    )
}