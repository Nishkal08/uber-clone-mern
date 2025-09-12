import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import React from 'react'
import { Toaster } from 'react-hot-toast' // Add this import
import { CaptainHome } from './pages/CaptainHome.jsx'
import { Routes, Route } from 'react-router-dom'
import Start from './pages/Start.jsx'
import Home from './pages/Home'
import UserLogin from './pages/UserLogin.jsx'
import UserSignUp from './pages/UserSignUp.jsx'
import CaptainLogin from './pages/CaptainLogin.jsx'
import UserLogout from './pages/UserLogout.jsx'
import CaptainSignUp from './pages/CaptainSignUp.jsx'
import UserProtectWrapper from './pages/UserProtectWrapper.jsx'
import { CaptainProtectWrapper } from './pages/CaptainProtectWrapper.jsx'
import CaptainRiding from './pages/CaptainRiding.jsx'
import Riding from './pages/Riding.jsx'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/home" element={
          <UserProtectWrapper>
            <Home />
          </UserProtectWrapper>
        } />
        <Route path="/user-login" element={<UserLogin />} />
        <Route path='/riding' element={<Riding />} />
        <Route path="/user-signup" element={<UserSignUp />} />
        <Route path="/user-logout" element={<UserLogout />} />
        <Route path="/captain-login" element={<CaptainLogin />} />
        <Route path="/captain-signup" element={<CaptainSignUp />} />
        <Route path="/captain-home" element={
          <CaptainProtectWrapper>
            <CaptainHome />
          </CaptainProtectWrapper>
        } />
        <Route path="/captain-ride" element={
          <CaptainProtectWrapper>
            <CaptainRiding />
          </CaptainProtectWrapper>
        } />
      </Routes>

      <Toaster
        position="top-center"
        toastOptions={{
          duration: 2000,
          style: {
            borderRadius: '8px',
            padding: '12px 16px',
            fontSize: '14px',
            fontWeight: 500,
            boxShadow: '0 2px 6px rgba(0, 0, 0, 0.08)',
          },
          success: {
            style: {
              background: '#ecfdf5', // light green
              color: '#065f46',      // dark green text
              border: '1px solid #a7f3d0',
            },
            iconTheme: {
              primary: '#10b981',
              secondary: '#ecfdf5',
            },
          },
          error: {
            style: {
              background: '#fef2f2', // light red
              color: '#991b1b',      // dark red text
              border: '1px solid #fecaca',
            },
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fef2f2',
            },
          },
        }}
      />

    </>
  )
}

export default App