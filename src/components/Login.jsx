import { useContext } from 'react';
import { Context } from "../Context"
import { YouTubeContext } from "../YouTubeContext"
import "./Login.css"

function Login() {
  const { loginSpotify } = useContext(Context)
  const { loginYouTube } = useContext(YouTubeContext)

  return (
    <div className='container-fluid d-flex align-items-center justify-content-center h-100'>
      <div className='login d-flex align-items-center flex-column'>
        <h1 className="login-header">Login to account:</h1>
        <button className="login-button" onClick={loginSpotify}>Connect Spotify Account</button>
        {/* <button className="login-button">Connect SoundCloud Account</button> */}
        <button className="login-button" onClick={loginYouTube}>Connect YouTube Account</button>
      </div>
    </div>
  );
}

export default Login;
