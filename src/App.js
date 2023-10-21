import React from "react";

const style = {
  bg: `h-screen w-s p-4 bg-gradient-to-r from-[#2F80ED] to-[#1CB5E0]`,
};

function App() {
  return (
  <div className={style.bg}>
    <div className={style.container}>
      <h3 classname={style.heading}>Todo App</h3>
      <form className={style.form}>
        <input className={style.input} type="text" placeholder="Add Todo" />
        <button className={style.button}></button>
      </form>
    </div>
  </div>
  );
}

export default App;
