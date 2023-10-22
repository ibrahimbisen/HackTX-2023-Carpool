import React, { useState } from "react";
import { db } from "./firebase";
import { collection, addDoc, doc, setDoc } from "firebase/firestore"; // Import the necessary Firestore functions
import { Link } from "react-router-dom";
import { style } from "./styles";

function DriverSignUp() {
  const [input, setInput] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    address: "",
    seats: 4,
    pickupTime: "",
  });

  const [signupLink, setSignupLink] = useState(null);

  const createTodo = async (e) => {
    e.preventDefault();
    if (!input.firstName || !input.lastName || !input.phoneNumber) {
      alert(
        "Please enter valid input for First Name, Last Name, and Phone Number"
      );
      return;
    }

    const passengers = Array(input.seats).fill(""); // Initialize the passengers array

    const driverData = {
      firstName: input.firstName,
      lastName: input.lastName,
      phoneNumber: input.phoneNumber,
      address: input.address,
      seats: input.seats,
      passengers: passengers, // Include the passengers data
    };

    // Create a new driver document in the "Driver" collection with a custom document ID
    // const driverId = `${input.firstName}-${input.lastName}-${input.phoneNumber}`;
    // const driverDocRef = doc(db, "Driver", driverId);
    const driverDocRef = await addDoc(collection(db, "Driver"), driverData);
    const driverId = driverDocRef.id;

    // Set the data for the driver document
    await setDoc(driverDocRef, driverData);

    // Generate and set the signup link
    const signupLink = `/passenger-signup/${driverId}`;
    setSignupLink(signupLink);

    const passengersCollection = collection(driverDocRef, "passengers");

    setInput({
      firstName: "",
      lastName: "",
      phoneNumber: "",
      address: "",
      seats: 4,
      pickuputime: input.pickupTime,
      passengers: passengers,
    });
  };

  return (
    <div className={style.container}>
      <h2 className={style.heading}>Driver Sign-Up</h2>
      <form onSubmit={createTodo}>
        <input
          type="text"
          className={style.input}
          placeholder="First Name"
          value={input.firstName}
          onChange={(e) => setInput({ ...input, firstName: e.target.value })}
        />
        <input
          type="text"
          className={style.input}
          placeholder="Last Name"
          value={input.lastName}
          onChange={(e) => setInput({ ...input, lastName: e.target.value })}
        />
        <input
          type="text"
          className={style.input}
          placeholder="Phone Number"
          value={input.phoneNumber}
          onChange={(e) => setInput({ ...input, phoneNumber: e.target.value })}
        />
        <input
          type="text"
          className={style.input}
          placeholder="Pickup Time" // New input field for pickup time
          value={input.pickupTime} // Value for pickup time
          onChange={(e) => setInput({ ...input, pickupTime: e.target.value })} // Handle pickup time input
        />
        <input
          type="text"
          className={style.input}
          placeholder="Address" // New input field for address
          value={input.address} // Value for address
          onChange={(e) => setInput({ ...input, address: e.target.value })} // Handle address input
        />
        <input
          type="number"
          className={style.input}
          placeholder="Seats Available" // New input field for the number of seats
          value={input.seats} // Value for seats
          onChange={(e) => setInput({ ...input, seats: e.target.value })} // Handle seats input
        />
        <button type="submit" className={style.button}>
          Sign Up
        </button>
      </form>
      {signupLink && (
        <div className={style.count}>
          <p>Your unique signup link is:</p>
          <Link to={signupLink} className={style.button}>
            {signupLink}
          </Link>
        </div>
      )}
    </div>
  );
}

export default DriverSignUp;
