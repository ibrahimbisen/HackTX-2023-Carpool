import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc, collection, addDoc, query, onSnapshot, deleteDoc } from "firebase/firestore";
import { db } from "./firebase";
import { style } from "./styles";

function PassengerSignUp() {
  const { driverId } = useParams();
  const [driverData, setDriverData] = useState(null);
  const [passengerForm, setPassengerForm] = useState({
    name: "",
    phoneNumber: "",
  });
  const [passengers, setPassengers] = useState([]);
  let [remainingSpots, setRemainingSpots] = useState(0); // Track available spots
  const [showNoSpotsPopup, setShowNoSpotsPopup] = useState(false); // State for the pop-up
  const [editPassengerIndex, setEditPassengerIndex] = useState(null);
  const [verifyPhoneNumber, setVerifyPhoneNumber] = useState(""); // State for verifying phone number
  const [isVerified, setIsVerified] = useState(false); // State to track phone number verification
  const [isConfirmationPopupOpen, setConfirmationPopupOpen] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);

  const unsubscribeRef = React.useRef(null);

  const closePopup = () => {
    setShowNoSpotsPopup(false);
  };

  const openEditPopup = (index) => {
    setEditPassengerIndex(index);
    setVerifyPhoneNumber("");
  };

  const handleVerifyPhoneNumber = () => {
    // Implement your phone number verification logic here
    // Example: if (verifyPhoneNumber === passengers[editPassengerIndex].phoneNumber) setIsVerified(true);
    setIsVerified(true); // For testing, consider implementing your own logic
  };

  const handleLeaveOrStay = (action) => {
    if (action === "leave") {
      // Implement the logic to remove the passenger from the list
      // Example: const updatedPassengers = passengers.filter((_, index) => index !== editPassengerIndex);
      // setPassengers(updatedPassengers);

      deleteDoc(doc(db, "Driver", driverId, "passengers", passengers[editPassengerIndex].id));

      setIsLeaving(true);
    } else {
      setConfirmationPopupOpen(true);
    }

    setEditPassengerIndex(null);
  };

  const confirmLeaveOrStay = () => {
    if (isLeaving) {
      // Implement any additional logic here
    } else {
      // Implement any additional logic for staying
    }

    setConfirmationPopupOpen(false);
  };

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

    const fetchPassengers = async () => {
      try {
        const passengersCollectionRef = collection(db, "Driver", driverId, "passengers");
        const q = query(passengersCollectionRef);

        unsubscribeRef.current = onSnapshot(q, (snapshot) => {
          const passengerList = [];
          snapshot.forEach((doc) => {
            passengerList.push({ id: doc.id, ...doc.data() });
          });
          setPassengers(passengerList);
        });
      } catch (error) {
        console.error("Error fetching passenger list:", error);
      }
    };

    fetchPassengers();

    return () => {
      if (unsubscribeRef.current) {
        unsubscribeRef.current();
      }
    };
  }, [driverId]);

  const handlePassengerFormSubmit = async (e) => {
    e.preventDefault();

    if (!passengerForm.name || !passengerForm.phoneNumber) {
      alert("Please enter valid passenger information.");
      return;
    }

    if (remainingSpots > 0) {
      try {
        const passengersCollectionRef = collection(db, "Driver", driverId, "passengers");
        const passengerDocRef = await addDoc(passengersCollectionRef, passengerForm);

        setPassengerForm({
          name: "",
          phoneNumber: "",
        });

        console.log("Passenger sign-up successful. Passenger ID:", passengerDocRef.id);
      } catch (error) {
        console.error("Error adding passenger information:", error);
      }
    } else {
      setShowNoSpotsPopup(true);
    }
  };

  const availableSeats = driverData ? driverData.seats : 0;
  remainingSpots = availableSeats - passengers.length;

  return (
    <div className={style.bg}>
      <div className={style.container}>
        {driverData && (
          <div className="border p-4 rounded-md shadow-lg my-4">
            <h1 className={style.heading}>Driver Information</h1>
            <p className="text-gray-800">
              <strong>Name:</strong> {driverData.firstName} {driverData.lastName}
            </p>
            <p className="text-gray-800">
              <strong>Phone Number:</strong> {driverData.phoneNumber}
            </p>
            <p className="text-gray-800">
              <strong>Address:</strong> {driverData.address}
            </p>
            <p className="text-gray-800">
              <strong>Available Seats:</strong> {availableSeats}
            </p>
            <p className="text-gray-800">
              <strong>Remaining Spots:</strong> {remainingSpots}
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

      <div className={style.container}>
        <h2 className={style.heading}>Current Passengers</h2>
        <ul>
          {passengers.map((passenger, index) => (
            <li key={index}>
              {editPassengerIndex === index ? (
                <div>
                  {isVerified ? (
                    <div>
                      <p>Options:</p>
                      <button className={style.button} onClick={() => handleLeaveOrStay("leave")}>Leave </button>
                      <button className={style.button} onClick={() => handleLeaveOrStay("stay")}>Stay</button>
                      <button className={style.button} onClick={() => setEditPassengerIndex(null)}>Log Out</button>
                    </div>
                  ) : (
                    <div>
                      <p>Verify your identity:</p>
                      <input
                        type="text"
                        placeholder="Enter your phone number"
                        value={verifyPhoneNumber}
                        onChange={(e) => setVerifyPhoneNumber(e.target.value)}
                      />
                      <button className={style.button} onClick={handleVerifyPhoneNumber}>Verify</button>
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  {passenger.name} - <button className={style.button} onClick={() => openEditPopup(index)}>Edit</button>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>

      {showNoSpotsPopup && (
        <div className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 border border-gray-300 rounded shadow-lg z-10 text-center ${style.popup}`}>
          <p>Carpool group is full</p>
          <button className="mt-4 px-4 py-2 bg-green-400 text-black rounded hover-bg-blue-700" onClick={closePopup}>
            Close
          </button>
        </div>
      )}

      {/* {isConfirmationPopupOpen && (
        <div className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 border border-gray-300 rounded shadow-lg z-10 text-center ${style.popup}`}>
          <p>Do you want to leave or stay in the carpool group?</p>
          <button className={style.button} onClick={() => handleLeaveOrStay("leave")}>Leave</button>
          <button className={style.button} onClick={() => handleLeaveOrStay("stay")}>Stay</button>
          <button className={style.button} onClick={() => setEditPassengerIndex(null)}>Log Out</button>
        </div>
      )} */}
    </div>
  );
}

export default PassengerSignUp;