import React, { useState, useEffect } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import Todo from "./Todo";

import { db } from "./firebase";
import {
  query,
  collection,
  onSnapshot,
  updateDoc,
  doc,
  addDoc,
} from "firebase/firestore";

const style = {
  bg: `h-screen w-s p-4 bg-gradient-to-r from-[#2F80ED] to-[#1CB5E0]`,
  container: `bg-slate-100  max-w-[500px] w-full m-auto rounded-md shadow-xl p-4`,
  heading: `text-3xl font-bold text-center text-gray-900 p-2`,
  form: `flex flex-col justify-between`,
  input: `border p-2 w-full text-xl m-2`,
  button: `border p-4 ml-2 sm:mt-0 bg-purple-500`,
  count: `text-center p-2`
};

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    address: "",
    seats: 4,
    passengers: ["Greg", "John", "Kelly", "Craig"],
  });

  // Create a new todo with user input
  const createTodo = async (e) => {
    e.preventDefault();
    if (!input.firstName || !input.lastName || !input.phoneNumber) {
      alert("Please enter valid input for First Name, Last Name, and Phone Number");
      return;
    }

    // Add a new document to the 'todo' collection with the input data
    await addDoc(collection(db, "Driver"), {
      firstName: input.firstName,
      lastName: input.lastName,
      phoneNumber: input.phoneNumber,
      address: input.address,
      seats: input.seats,
      passengers: input.passengers,
    });

    // Clear the input fields after adding the document
    setInput({
      firstName: "",
      lastName: "",
      phoneNumber: "",
      address: "",
      seats: 4,
      passengers: [],
    });
  };

  // ... (your existing code for reading and updating todos)

  return (
    <div className={style.bg}>
      <div className={style.container}>
        <h3 className={style.heading}>CarLink</h3>
        <form onSubmit={createTodo} className={style.form}>
          <input
            value={input.firstName}
            onChange={(e) =>
              setInput({ ...input, firstName: e.target.value })
            }
            className={style.input}
            type="text"
            placeholder="First Name"
          />
          <input
            value={input.lastName}
            onChange={(e) =>
              setInput({ ...input, lastName: e.target.value })
            }
            className={style.input}
            type="text"
            placeholder="Last Name"
          />
          <input
            value={input.phoneNumber}
            onChange={(e) =>
              setInput({ ...input, phoneNumber: e.target.value })
            }
            className={style.input}
            type="text"
            placeholder="Phone Number"
          />
          <input
            value={input.address}
            onChange={(e) =>
              setInput({ ...input, address: e.target.value })
            }
            className={style.input}
            type="text"
            placeholder="Address"
          />
          <input
            value={input.seats}
            onChange={(e) =>
              setInput({ ...input, seats: parseInt(e.target.value) })
            }
            className={style.input}
            type="number"
            placeholder="Seats"
          />
          <button className={style.button}>Submit</button>
        </form>
        <p className={style.count}>You have {todos.length} todos</p>
      </div>
    </div>
  );
}

export default App;
