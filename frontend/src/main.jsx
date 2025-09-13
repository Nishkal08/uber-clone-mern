import { createRoot } from 'react-dom/client'
import "../index.css"
import React from 'react'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import CaptainContext from './context/CaptainContext.jsx'
import UserContext from './context/UserContext.jsx'
import RideContext from './context/RideContext.jsx'
import SocketProvider from './context/SocketContext.jsx'
import { MapProvider } from './context/MapContext.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <CaptainContext>
      <UserContext>
        <RideContext>
          <SocketProvider>
            <MapProvider>
              <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
                <App />
              </GoogleOAuthProvider>
            </MapProvider>
          </SocketProvider>
        </RideContext>
      </UserContext>
    </CaptainContext>
  </BrowserRouter>
)
