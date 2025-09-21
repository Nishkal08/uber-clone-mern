import React from "react";

const Footer = () => {
  return (
    <footer className="w-full bg-white border-t border-gray-200 py-8 mt-16">
      <div className="container mx-auto px-6">
        {/* Main footer content */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          {/* Copyright text */}
          <div className="text-sm text-gray-600 font-medium">
            © {new Date().getFullYear()} Uber Clone. All Rights Reserved.
          </div>
          
          {/* Footer links */}
          <div className="flex flex-wrap justify-center md:justify-end items-center gap-6 text-sm">
            <a
              href="https://merchant.razorpay.com/policy/RHVTWrGAvHNkvs/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-black transition-colors duration-200 font-medium"
            >
              Privacy Policy
            </a>
            <a
              href="https://merchant.razorpay.com/policy/RHVTWrGAvHNkvs/terms"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-black transition-colors duration-200 font-medium"
            >
              Terms & Conditions
            </a>
            <a
              href="https://merchant.razorpay.com/policy/RHVTWrGAvHNkvs/refund"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-black transition-colors duration-200 font-medium"
            >
              Refund Policy
            </a>
            <a
              href="https://merchant.razorpay.com/policy/RHVTWrGAvHNkvs/contact_us"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-black transition-colors duration-200 font-medium"
            >
              Contact Us
            </a>
          </div>
        </div>
        
        {/* Disclaimer text */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-500 text-center leading-relaxed max-w-4xl mx-auto">
            By using this service, you agree to our terms and conditions. This platform connects riders with drivers and facilitates transportation services. 
            We may send you service-related notifications via SMS, email, or in-app messages to keep you informed about your rides and account activity.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;