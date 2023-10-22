import React, { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [isDarkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
    // Apply dark mode styles here as needed.
  };

  return (
    <nav className={`p-4 text-black flex justify-start items-center transition duration-300 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
      <div className="text-2xl font-bold flex">
        <h1 className="justify-self-start">CarLink</h1>
      </div>
      <ul className="flex space-x-4 px-10 justify-end">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          {/* <Link to="/about">About</Link> */}
        </li>
      </ul>
      {/* <label className="switch relative inline-block w-16">
        <input
          type="checkbox"
          checked={isDarkMode}
          onChange={toggleDarkMode}
          className="hidden"
        />
        <span className="slider absolute cursor-pointer block w-10 h-4 bg-gray-400 rounded-full" />
      </label> */}
    </nav>
  );
}

export default Navbar;
