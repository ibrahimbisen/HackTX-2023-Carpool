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
        <p className={style.text}>Tired of dealing with the hassle of transportation? CarLink is your solution! With our easy-to-use app, you can find rides or offer your car for a carpool adventure. Whether you're a passenger looking for a convenient way to get around town or a driver wanting to share the ride and reduce your expenses, CarLink has you covered. Download now and experience a more efficient and sustainable way to travel!</p>
        <Link to="/driver-signup">
          <button className={style.button}>Driver Sign-Up</button>
        </Link>
      </div>
    </div>
  );
}

export default App;
