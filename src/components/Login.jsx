import { useContext } from "react";
import { Context } from "../contexts/Context"
import { ThemeContext } from "../contexts/ThemeContext"

import "./Login.css"

function Login() {
  const { loginSpotify } = useContext(Context)
  const { theme } = useContext(ThemeContext)

  function getLoginClass() {
    let baseClass = `container-fluid d-flex 
      align-items-center justify-content-center 
      h-100 p-3`

    return baseClass + ` login-${theme}`
  }

  return (
    <div
      className={getLoginClass()}
      id={theme}
    >
      <div className='login d-flex align-items-center flex-column h-100'>
        <h1 className="login-header">Login to account:</h1>
        <div
          className={`login-body d-flex rounded
            flex-column align-items-center justify-content-center`}
        >
          <button
            className={`login-button p-1 button-${theme} rounded`}
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
