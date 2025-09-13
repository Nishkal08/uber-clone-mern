import React from "react";

const LogoutButton = ({ onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className="h-10 w-10 flex items-center justify-center rounded-full bg-white shadow-md hover:bg-gray-200 transition-colors duration-200 border border-gray-300"
    title="Logout"
  >
    <i className="ri-logout-box-line text-xl text-gray-700"></i>
  </button>
);

export default LogoutButton;