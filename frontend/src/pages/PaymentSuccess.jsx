import React from "react";
import { Link } from "react-router-dom";

const PaymentSuccess = () => {
  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white shadow-2xl rounded-2xl p-10 flex flex-col items-center text-center max-w-md">
        <div className="text-green-600 text-6xl mb-4">✅</div>
        <h1 className="text-3xl font-bold text-gray-800">Payment Successful!</h1>
        <p className="mt-2 text-gray-600">
          Your ride has been paid successfully. Thank you for riding with us 🚖
        </p>
        <Link
          to="/home"
          className="mt-6 bg-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-900 transition"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
};

export default PaymentSuccess;
