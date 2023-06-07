import { useContext } from "react";
import { Context } from "../Context";
import "./Login.css";
import { useContext } from "react";
import { Context } from "../Context";
import "./Login.css";

function Login() {
  const { loginSpotify, loginAmazon } = useContext(Context);

  return (
    <div className="container-fluid d-flex align-items-center justify-content-center h-100">
      <div className="login d-flex align-items-center flex-column">
        <h1 className="login-header">Login to account:</h1>
        <button className="login-button" onClick={loginSpotify}>
          Connect Spotify Account
        </button>
        {/* <button className="login-button">Connect SoundCloud Account</button> */}
        <button
          className="login-button"
          onClick={loginAmazon}
          id="LoginWithAmazon"
        ></button>
      </div>
    </div>
  );
}

export default Login;
