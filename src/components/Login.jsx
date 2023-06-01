import "./Login.css"

function Login() {
  return (
    <div className='container-fluid d-flex align-items-center justify-content-center h-100'>
        <div className='login d-flex align-items-center flex-column'>
            <h1>Login</h1>
            <p className="d-flex align-self-start">Email</p>
            <input type="email" />
        </div>
    </div>
  )
}

export default Login