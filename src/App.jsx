import { useContext } from 'react'

import Login from "./components/Login"
import Main from "./components/Main-window"
import { Context } from "./context/Context"
import "./App.css"

function App() {
  const { accessToken } = useContext(Context);

  return (
    <>
      {accessToken ? <Main /> : <Login />}

    </>
  )
}

export default App
