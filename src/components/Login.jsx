import { useContext } from "react";
import { Context } from "../contexts/Context"
import { ThemeContext } from "../contexts/ThemeContext"

import "./Login.css"
import "./main.css"

function Login() {
  const { loginSpotify } = useContext(Context)
  const { theme } = useContext(ThemeContext)

  return (
    <div
      className='container-fluid d-flex align-items-center justify-content-center h-100'
      id={theme}
    >
      <div className='login d-flex align-items-center flex-column'>
        <h1 className="login-header">Login to account:</h1>
        <button className="login-button" onClick={loginSpotify}>Connect Spotify Account</button>
      </div>
    </div>
  );
}

export default Login;
