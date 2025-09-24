import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";

const PaymentFailed = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [pulseAnimation, setPulseAnimation] = useState(false);

  useEffect(() => {
    // Trigger entrance animation
    setTimeout(() => setIsVisible(true), 100);
    
    // Start pulse animation for the icon
    const pulseInterval = setInterval(() => {
      setPulseAnimation(true);
      setTimeout(() => setPulseAnimation(false), 1000);
    }, 2000);

    return () => clearInterval(pulseInterval);
  }, []);

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-br from-red-50 via-pink-50 to-orange-50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-red-100 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-pink-100 rounded-full opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>
      
      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-red-300 rounded-full opacity-30 animate-bounce"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          ></div>
        ))}
      </div>

      <div className={`bg-white shadow-2xl rounded-3xl p-12 flex flex-col items-center text-center max-w-md relative z-10 border border-red-100 transform transition-all duration-1000 ${
        isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-10 opacity-0 scale-95'
      }`}>
        
        {/* Animated error icon */}
        <div className={`relative mb-6 transform transition-all duration-500 ${
          pulseAnimation ? 'scale-110' : 'scale-100'
        }`}>
          <div className="absolute inset-0 bg-red-200 rounded-full animate-ping opacity-75"></div>
          <div className="relative bg-red-100 rounded-full p-4">
            <svg 
              className="w-16 h-16 text-red-600 animate-pulse" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
        </div>

        {/* Title with typewriter effect */}
        <h1 className={`text-4xl font-bold text-gray-800 mb-4 transform transition-all duration-700 delay-300 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
        }`}>
          Payment Failed
        </h1>
        
        {/* Subtitle with slide-in animation */}
        <p className={`text-gray-600 text-lg leading-relaxed mb-8 transform transition-all duration-700 delay-500 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
        }`}>
          Oops! Something went wrong with your payment. Don't worry, your ride is still active and no charges were made.
        </p>

        {/* Animated divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-red-200 to-transparent mb-8"></div>

        {/* Action button */}
        <div className={`flex flex-col gap-4 w-full transform transition-all duration-700 delay-700 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
        }`}>
          <Link
            to="/riding"
            className="group relative overflow-hidden bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-4 rounded-xl font-semibold hover:from-red-700 hover:to-red-800 transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Go to Home
            </span>
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
          </Link>
        </div>

        {/* Help text */}
        <p className={`text-sm text-gray-500 mt-6 transform transition-all duration-700 delay-900 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
        }`}>
          Need help? Contact support for assistance
        </p>

        {/* Decorative corner elements */}
        <div className="absolute top-4 right-4 w-12 h-12 border-2 border-red-200 rounded-full opacity-20"></div>
        <div className="absolute bottom-4 left-4 w-8 h-8 border-2 border-pink-200 rounded-full opacity-20"></div>
      </div>

      {/* Bottom floating elements */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
        <div className="flex gap-2">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-3 h-3 bg-red-400 rounded-full animate-bounce opacity-60"
              style={{ animationDelay: `${i * 0.2}s` }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PaymentFailed;