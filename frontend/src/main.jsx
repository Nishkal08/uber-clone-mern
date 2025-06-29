import { createRoot } from 'react-dom/client'
import "../index.css"
import React from 'react'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import CaptainContext from './context/CaptainContext.jsx'
import UserContext from './context/UserContext.jsx'
import RideContext from './context/RideContext.jsx'
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <CaptainContext>
      <UserContext>
        <RideContext>
          <App />
        </RideContext>
      </UserContext>
    </CaptainContext>
  </BrowserRouter>
)
