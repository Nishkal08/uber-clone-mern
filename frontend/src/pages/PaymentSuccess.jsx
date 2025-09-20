import React from "react";
import { Link } from "react-router-dom";

const PaymentSuccess = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 flex items-center justify-center p-4 relative overflow-hidden">
      
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-green-200/30 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-blue-200/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/3 w-56 h-56 bg-purple-200/30 rounded-full blur-3xl"></div>
        
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(0,0,0,0.15) 1px, transparent 0)`,
          backgroundSize: '20px 20px'
        }}></div>
      </div>
      <div className="bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl p-10 flex flex-col items-center text-center max-w-md w-full border border-white/20 relative z-10">
        
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6 opacity-0 animate-fadeIn transform scale-95 animate-scaleIn">
          <svg 
            className="w-12 h-12 text-green-600" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
            strokeWidth={2}
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              d="M5 13l4 4L19 7" 
            />
          </svg>
        </div>

        <h1 className="text-3xl font-bold text-gray-800 mb-4 opacity-0 animate-fadeIn" style={{ animationDelay: '300ms', animationFillMode: 'forwards' }}>
          Payment Successful!
        </h1>

        <p className="text-gray-600 mb-8 text-lg leading-relaxed opacity-0 animate-fadeIn" style={{ animationDelay: '450ms', animationFillMode: 'forwards' }}>
          Your ride has been completed and paid successfully. Thank you for riding with us.
        </p>

        <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-8 w-full opacity-0 animate-fadeIn" style={{ animationDelay: '600ms', animationFillMode: 'forwards' }}>
          <div className="flex items-center justify-center mb-3">
            <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-base font-medium text-green-800">Transaction Complete</span>
          </div>
          <p className="text-sm text-green-700">
            Your payment has been processed securely and your receipt has been sent to your email.
          </p>
        </div>

        <Link
          to="/home"
          className="bg-black text-white px-8 py-3 rounded-lg font-medium hover:bg-gray-900 transform hover:scale-105 transition-all duration-300 flex items-center justify-center opacity-0 animate-fadeIn"
          style={{ animationDelay: '800ms', animationFillMode: 'forwards' }}
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          Back to Home
        </Link>

        <p className="text-sm text-gray-500 mt-6 opacity-0 animate-fadeIn" style={{ animationDelay: '950ms', animationFillMode: 'forwards' }}>
          Thank you for choosing our service. Have a safe journey!
        </p>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes scaleIn {
          from { transform: scale(0.8); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out forwards;
        }
        
        .animate-scaleIn {
          animation: scaleIn 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default PaymentSuccess;