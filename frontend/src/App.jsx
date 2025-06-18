import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import React from 'react'
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
        <Route path="/user-signup" element={<UserSignUp />} />
        <Route path="/user-logout" element={<UserLogout />} />
        <Route path='/riding' element={<Riding />} />
        <Route path="/captain-login" element={<CaptainLogin />} />
        <Route path="/captain-signup" element={<CaptainSignUp />} />
        <Route path="/captain-home" element={
          <CaptainProtectWrapper>
            <CaptainHome />
          </CaptainProtectWrapper>
        } />

      </Routes>
    </>
  )
}

export default App
