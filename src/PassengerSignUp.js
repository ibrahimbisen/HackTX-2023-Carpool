import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";
import { style } from "./styles";

function PassengerSignUp({ style }) {
  const { driverId } = useParams();
  const [driverData, setDriverData] = useState(null);
  const [passengerForm, setPassengerForm] = useState({
    name: "",
    phoneNumber: "",
  });

  useEffect(() => {
    const fetchDriverData = async () => {
      try {
        const driverDocRef = doc(db, "Driver", driverId);
        const driverDocSnapshot = await getDoc(driverDocRef);

        if (driverDocSnapshot.exists()) {
          const data = driverDocSnapshot.data();
          setDriverData(data);
        } else {
          console.error("Driver data not found.");
        }
      } catch (error) {
        console.error("Error fetching driver data:", error);
      }
    };

    fetchDriverData();
  }, [driverId]);

  const handlePassengerFormSubmit = (e) => {
    e.preventDefault();
    console.log("Passenger form submitted:", passengerForm);
  };

  return (
    <div className={style.bg}>
      <div className={style.container}>
        {driverData && (
          <div className="border p-4 rounded-md shadow-lg my-4">
            <h1 className={style.heading}>Driver Information</h1>
            <p className="text-gray-800">
              <strong>Name:</strong> {driverData.firstName}{" "}
              {driverData.lastName}
            </p>
            <p className="text-gray-800">
              <strong>Phone Number:</strong> {driverData.phoneNumber}
            </p>
            <p className="text-gray-800">
              <strong>Address:</strong> {driverData.address}
            </p>
          </div>
        )}
        <h2 className={style.heading}>Passenger Sign-Up Form</h2>
        <form onSubmit={handlePassengerFormSubmit} className={style.form}>
          <input
            type="text"
            className={style.input}
            placeholder="Name"
            value={passengerForm.name}
            onChange={(e) =>
              setPassengerForm({ ...passengerForm, name: e.target.value })
            }
          />
          <input
            type="text"
            className={style.input}
            placeholder="Phone Number"
            value={passengerForm.phoneNumber}
            onChange={(e) =>
              setPassengerForm({
                ...passengerForm,
                phoneNumber: e.target.value,
              })
            }
          />
          <button type="submit" className={style.button}>
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

export default PassengerSignUp;
