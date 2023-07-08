import { useContext } from "react";

import Login from "./components/Login"
import CurrentSongOffCanvas from "./components/CurrentSongOffCanvas"
import Main from "./components/Main-window"
import { Context } from "./contexts/Context"

import "./App.css"

function App() {
  const { isAccessTokenValid } = useContext(Context);

  return <>
    {isAccessTokenValid ? <Main /> : <Login />}
    <CurrentSongOffCanvas />
  </>;
}

export default App;
