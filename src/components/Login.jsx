import {useState} from "react"
import "./Login.css"

function Login() {
  const [loginPage, setLoginPage] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: ""
  });

  function handleChange(event){
    const {name, value} = event.target
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
    }))
  }

  function handleLogin(event){
    event.preventDefault();
    console.log(formData)
  }

  function handleSignUp(event){
    event.preventDefault();
    console.log(formData)
  }

  function signUpPage(){
    setLoginPage(true);
  }

  return (
    <div className='container-fluid d-flex align-items-center justify-content-center h-100'>
        <div className='login d-flex align-items-center flex-column'>
            <h1 className="login-header">{loginPage ? "Sign Up" : "Login"}</h1>
            <form className="d-flex flex-column login-form" onSubmit={loginPage ? handleLogin : handleSignUp}>
              <input 
                type="email"
                name="email" 
                placeholder="Email address"
                onChange={handleChange}
                value={formData.email}
              />
              <input 
                type="password"
                name="password" 
                placeholder="Password"
                onChange={handleChange}
                value={formData.password}
              />
              {loginPage && 
                <input 
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm password"
                  onChange={handleChange}
                  value={formData.confirmPassword}
                />
              }
              <button className="login-button">{loginPage ? "Sign Up" : "Sign in"}</button>
              {!loginPage && <p className="align-self-center signup-text" onClick={signUpPage}>Sign up</p>}
            </form>
        </div>
    </div>
  )
}

export default Login