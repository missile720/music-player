import React from 'react'
import ReactDOM from 'react-dom/client'
import { ContextProvider } from "./Context"
import { YouTubeContextProvider } from "./YouTubeContext"
import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <YouTubeContextProvider>
      <ContextProvider>
        <App />
      </ContextProvider>
    </YouTubeContextProvider>
  </>,
)
