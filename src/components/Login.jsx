import "./Login.css"

function Login() {

  return (
    <div className='container-fluid d-flex align-items-center justify-content-center h-100'>
        <div className='login d-flex align-items-center flex-column'>
            <h1 className="login-header">Login to account:</h1>
              <button className="login-button">Connect Spotify Account</button>
              <button className="login-button">Connect SoundCloud Account</button>
              <button className="login-button">Connect ITunes Account</button>
        </div>
    </div>
  )
}

export default Login