import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'        // <-- default import

import './index.css'

const savedTheme = localStorage.getItem('theme-preference') || 'auto'
document.documentElement.dataset.theme = savedTheme

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
