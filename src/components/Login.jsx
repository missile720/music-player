import { useContext } from "react";
import { Context } from "../Context";
import "./Login.css";

function Login() {
  const { loginSpotify } = useContext(Context);

  function loginAmazon() {
    const options = {
      scope: "profile",
      pkce: true,
      scope_data: {
        profile: { essential: false },
      },
    };
    amazon.Login.authorize(options, function (response) {
      if (response.error) {
        alert("oauth error " + response.error);
        return;
      }
      amazon.Login.retrieveToken(response.code, function (response) {
        if (response.error) {
          alert("oauth error " + response.error);
          return;
        }
        console.log("Access Token: " + response.access_token);
      });
    });
  }

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
