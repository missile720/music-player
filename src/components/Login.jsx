import { useState } from "react";
import "./Login.css"

function Login() {
  const [dataSet, setDataSet] = useState({});

  async function loginSpotify(){
    const clientId = 'a74cfef560a1459780760b9609009811';
    const redirectUri = 'http://localhost:5173/callback';

    let codeVerifier = generateRandomString(128);

    async function generateCodeChallenge(codeVerifier) {
      function base64encode(string) {
        const encoder = new TextEncoder();
        const data = encoder.encode(string);
        const base64 = window.btoa(String.fromCharCode(...data));
        return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
      }
    
      const encoder = new TextEncoder();
      const data = encoder.encode(codeVerifier);
      const digest = await window.crypto.subtle.digest('SHA-256', data);
    
      return base64encode(digest);
    }
    

    generateCodeChallenge(codeVerifier).then(codeChallenge => {
      let state = generateRandomString(16);
      let scope = 'user-read-private user-read-email playlist-read-private'; //make sure to check doc for scope for each type of request

      localStorage.setItem('code_verifier', codeVerifier);

      let args = new URLSearchParams({
        response_type: 'code',
        client_id: clientId,
        scope: scope,
        redirect_uri: redirectUri,
        state: state,
        code_challenge_method: 'S256',
        code_challenge: codeChallenge
      });

      window.location = 'https://accounts.spotify.com/authorize?' + args;
    });

    const urlParams = new URLSearchParams(window.location.search);
    let code = urlParams.get('code');

    codeVerifier = localStorage.getItem('code_verifier');

    let body = new URLSearchParams({
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: redirectUri,
      client_id: clientId,
      code_verifier: codeVerifier
    });

    const response = fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: body
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('HTTP status ' + response.status);
        }
        return response.json();
      })
      .then(data => {
        localStorage.setItem('access_token', data.access_token);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  //getProfile();

  async function getProfile() {
    let accessToken = localStorage.getItem('access_token');
  
    const response = await fetch('https://api.spotify.com/v1/me', {
      headers: {
        Authorization: 'Bearer ' + accessToken
      }
    });
  
    const data = await response.json();
    setDataSet(data);
  }

  console.log(dataSet);

  function generateRandomString(length) {
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  
    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

  return (
    <div className='container-fluid d-flex align-items-center justify-content-center h-100'>
        <div className='login d-flex align-items-center flex-column'>
            <h1 className="login-header">Login to account:</h1>
              <button className="login-button" onClick={loginSpotify}>Connect Spotify Account</button>
              <button className="login-button">Connect ITunes Account</button>
        </div>
    </div>
  )
}

export default Login