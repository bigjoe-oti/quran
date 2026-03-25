import React from 'react'
import { createRoot } from 'react-dom/client'
import { Analytics } from "@vercel/analytics/react"
import { TooltipProvider } from './context/TooltipContext'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <TooltipProvider>
      <App />
      <Analytics />
    </TooltipProvider>
  </React.StrictMode>,
)
