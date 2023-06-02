import Login from "./components/Login";
import Main from "./components/Main-window";
import "./App.css";

function App() {
  return (
    <>
      {Main ? <Main /> : <Login />}

    </>
  )
}

export default App;
