import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import TelegramWebApp from './components/TelegramWebApp.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <TelegramWebApp>
      <App />
    </TelegramWebApp>
  </React.StrictMode>,
)