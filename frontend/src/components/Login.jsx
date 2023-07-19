import { useContext } from "react";
import { Context } from "../contexts/Context"
import { ThemeContext } from "../contexts/ThemeContext"

import "./Login.css"

function Login() {
  const { loginSpotify } = useContext(Context)
  const { theme, mode } = useContext(ThemeContext)

  return (
    <div
      className="container-fluid d-flex 
        align-items-center justify-content-center 
        h-100 p-3"
      id={`primary-${theme}-${mode}`}
    >
      <div className='login d-flex align-items-center flex-column h-100'>
        <h1 className="login-header">Login to account:</h1>
        <div
          className={`login-body d-flex rounded
            flex-column align-items-center justify-content-center`}
        >
          <button
            className={`btn login-button p-1 element-${theme}-${mode} rounded`}
            onClick={loginSpotify}
          >
            Connect Spotify Account
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
