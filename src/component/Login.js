import React from "react";
import { useUser } from "./UserContext";
import style from "../css/style.css";

export default function Login() {
  const logOutHandler = () => {
    console.log("clearing local storage");
    localStorage.clear();
  };
  return (
    <div class="login">
      <h1>Logged in</h1>
      <button onClick={logOutHandler}>Log Out</button>
    </div>
  );
}
