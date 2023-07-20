import { useContext } from "react";

import Login from "./components/Login"
import CurrentSongOffCanvas from "./components/CurrentSongOffCanvas"
import LogoutPrompt from "./components/LogoutPrompt";
import Main from "./components/Main-window"

import { Context } from "./contexts/Context"

import "./App.css"

function App() {
  const { accessToken } = useContext(Context);

  return <>
    {accessToken ? <Main /> : <Login />}
    <CurrentSongOffCanvas />
    <LogoutPrompt />
  </>;
}

export default App;
