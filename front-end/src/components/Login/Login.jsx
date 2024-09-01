import "./Login.css"
export default function Login(){
    return (
        <div className="login-form">

            
            <div className="login-form-container">
                
                <div className="login-image">
                    <img id="login-image" src="/public/orange-art.jpg" width={"320px"} height={"700px"}/>
                </div>

                <div className="form">
                    <form action="#">

                        <h2 class="form-title">L O G I N</h2>
                        <div class="input-field">
                            <input type="text" required />
                            <label>Enter username</label>
                        </div>
                        <div class="input-field">
                            <input type="password" required />
                            <label>Enter password</label>
                        </div>
                        <button type="submit">Log In</button>
                        <div class="Create-account">
                            <p>Don't have an account? <a href="#">Create account</a></p>
                        </div>
                    </form>
                     </div>
                </div>
            </div>
    )
}