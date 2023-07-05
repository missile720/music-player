import React from 'react'
import ReactDOM from 'react-dom/client'
import { ContextProvider } from "./contexts/Context"
import { MusicPlayerStateContextProvider } from "./contexts/MusicPlayerStateContext"
import { SettingsStateContextProvider } from './contexts/SettingsStateContext'
import { ThemeContextProvider } from './contexts/ThemeContext'
import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeContextProvider>
      <MusicPlayerStateContextProvider>
        <ContextProvider>
          <SettingsStateContextProvider>
            <App />
          </SettingsStateContextProvider>
        </ContextProvider>
      </MusicPlayerStateContextProvider>
    </ThemeContextProvider>
  </React.StrictMode>,
)
