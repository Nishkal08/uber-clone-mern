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
import PaymentSuccess from './pages/PaymentSuccess.jsx'
import PaymentFailed from './pages/PaymentFailure.jsx'
import Footer from './components/Footer.jsx'
import { useLocation } from 'react-router-dom';

function App() {
  const location = useLocation();
  const hideFooterRoutes = ['/riding','/home','/captain-ride','/captain-home'];


  const shouldShowFooter = !hideFooterRoutes.includes(location.pathname);

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
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="/payment-failed" element={<PaymentFailed />} />
      </Routes>

      {shouldShowFooter && <Footer />}

      <Toaster
        position="top-center"
        toastOptions={{
          duration: 4000,
          style: {
            borderRadius: '8px',
            padding: '12px 16px',
            fontSize: '14px',
            fontWeight: 500,
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)',
          },
          success: {
            style: {
              background: '#f9fafb',
              color: '#374151',
              border: '1px solid #d1fae5',
            },
            iconTheme: {
              primary: '#10b981',
              secondary: '#f9fafb',
            },
          },
          error: {
            style: {
              background: '#f9fafb',
              color: '#374151',
              border: '1px solid #fecaca',
            },
            iconTheme: {
              primary: '#ef4444',
              secondary: '#f9fafb',
            },
          },
        }}
      />
    </>
  )
}

export default App