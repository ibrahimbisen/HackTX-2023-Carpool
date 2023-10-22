import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import PassengerSignUp from "./components/PassengerSignUp";
import DriverSignUp from "./components/DriverSignUp";
import Navbar from "./components/navbar"; // Import the Navbar component
import { style } from "./components/styles";

function App() {
  return (
    <Router>
      <div>
        <Navbar /> {/* Include the Navbar component outside of the Routes */}
        <Routes>
          <Route path="/" element={<Form style={style} />} />
          <Route path="/driver-signup" element={<DriverSignUp style={style} />} />
          <Route path="/passenger-signup/:driverId" element={<PassengerSignUp style={style} />} />
        </Routes>
      </div>
    </Router>
  );
}

function Form({ style }) {
  return (
    <div className={style.bg}>
      <div className={style.container}>
        <h3 className={style.heading}>Welcome to CarLink!</h3>
        <p className={style.text}>Tired of commuting alone? Our free carpool app makes it easier than ever to share rides with friends and colleagues. Whether you're heading to work, school, or any event, you can now carpool effortlessly and help save the environment. Connect with others in your organization or invite your friends to create carpools that reduce traffic, lower emissions, and save you money. Carpooling has never been this simple and fun!</p>
        <Link to="/driver-signup">
          <button className={style.button}>Driver Sign-Up</button>
        </Link>
      </div>
    </div>
  );
}

export default App;
