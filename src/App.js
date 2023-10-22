import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import PassengerSignUp from "./PassengerSignUp";
import DriverSignUp from "./DriverSignUp";

const style = {
  bg: `h-screen w-s p-4 bg-gradient-to-r from-green-400 to-green-200`,
  container: `bg-slate-100  max-w-[500px] w-full m-auto rounded-md shadow-xl p-4`,
  heading: `text-3xl font-bold text-center text-gray-900 p-2`,
  form: `flex flex-col justify-between`,
  input: `border p-2 w-full text-xl m-2`,
  button: `border p-4 ml-2 sm:mt-0 bg-purple-500`,
  count: `text-center p-2`,
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Form style={style} />} />
        <Route path="/driver-signup" element={<DriverSignUp style={style} />} />
        <Route path="/passenger-signup/:driverId" element={<PassengerSignUp style={style} />} />
      </Routes>
    </Router>
  );
}

function Form({ style }) {
  return (
    <div className={style.bg}>
      <div className={style.container}>
        <h3 className={style.heading}>CarLink</h3>
        <Link to="/driver-signup">
          <button className={style.button}>Driver Sign-Up</button>
        </Link>
      </div>
    </div>
  );
}

export default App;
