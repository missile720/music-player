import React from 'react'
import ReactDOM from 'react-dom/client'
import { ContextProvider } from "./contexts/Context"
import { MusicPlayerStateContextProvider } from "./contexts/MusicPlayerStateContext"
import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MusicPlayerStateContextProvider>
      <ContextProvider>
        <App />
      </ContextProvider>
    </MusicPlayerStateContextProvider>
  </React.StrictMode>,
)
