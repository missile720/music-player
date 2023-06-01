import Login from "./components/Login"
import LibraryContainer from "./components/LibraryContainer"
import testData from "./data/test-playlist-data.js"
import './App.css'

function App() {
  const { playlist } = testData

  return (
    <>
      <LibraryContainer library={[playlist]} />
    </>
  )
}

export default App
