import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";

const NotFound404 = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [carAnimation, setCarAnimation] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 200);
    
    const carInterval = setInterval(() => {
      setCarAnimation(true);
      setTimeout(() => setCarAnimation(false), 3000);
    }, 5000);

    return () => clearInterval(carInterval);
  }, []);

  return (
    <div className="h-screen w-screen bg-white flex flex-col relative overflow-hidden">

      <div className="flex-1 flex items-center justify-center px-6">
        <div className={`text-center max-w-sm transform transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          
          <div className={`mb-8 flex justify-center transform transition-all duration-700 delay-300 ${
            isVisible ? 'scale-100 opacity-100' : 'scale-90 opacity-0'
          }`}>
            <div className={`relative transition-transform duration-3000 ${carAnimation ? 'translate-x-6' : 'translate-x-0'}`}>
              <svg 
                className="w-32 h-20 text-gray-300" 
                viewBox="0 0 128 80" 
                fill="none"
              >
                <path 
                  d="M20 50h88c4 0 8-4 8-8V34c0-4-4-8-8-8H28c-4 0-8 4-8 8v16z" 
                  fill="currentColor"
                />
                <path 
                  d="M25 45h20c2 0 3-1 3-3v-8c0-2-1-3-3-3H25v14zM55 45h20c2 0 3-1 3-3v-8c0-2-1-3-3-3H55v14z" 
                  fill="white"
                />
                <circle cx="35" cy="60" r="8" fill="currentColor"/>
                <circle cx="93" cy="60" r="8" fill="currentColor"/>
                <circle cx="35" cy="60" r="4" fill="white"/>
                <circle cx="93" cy="60" r="4" fill="white"/>
                <circle cx="113" cy="42" r="2" fill="#FFD700"/>
              </svg>
            </div>
          </div>

          <h1 className={`text-6xl font-bold text-gray-800 mb-4 transform transition-all duration-700 delay-500 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}>
            404
          </h1>

          <h2 className={`text-2xl font-[650] text-gray-800 mb-3 transform transition-all duration-700 delay-600 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}>
            Route Not Found
          </h2>

          <p className={`text-[#545454] text-base mb-8 leading-relaxed transform transition-all duration-700 delay-700 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}>
            Looks like you've taken a wrong turn. Let's get you back on track.
          </p>

          <div className={`transform transition-all duration-700 delay-800 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}>
            <Link
              to="/"
              className="w-full inline-block bg-black text-white rounded-lg font-semibold py-3 px-8 hover:bg-gray-900 transition-colors"
            >
              Go Home
            </Link>
          </div>

          <p className={`text-sm text-[#545454] mt-6 transform transition-all duration-700 delay-900 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}>
            Need a ride? Book now from the home page
          </p>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-16 overflow-hidden">
        <div className="absolute bottom-8 left-0 w-full">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute h-0.5 bg-gray-200 animate-pulse"
              style={{
                left: `${i * 10}%`,
                width: '6%',
                animationDelay: `${i * 0.1}s`,
                animationDuration: '2s',
              }}
            />
          ))}
        </div>
      </div>

      <div className="absolute bottom-6 right-6">
        <div className="flex gap-1">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 bg-gray-300 rounded-full animate-bounce opacity-40"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotFound404;