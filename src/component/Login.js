import React from "react";
import { useUser } from "./UserContext";

export default function Login() {
  const [user, setUser] = useUser();
  const logOutHandler = () => {
    console.log("clearing season storage");
    sessionStorage.clear();
    setUser(undefined);
  };
  return (
    <div>
      <h1>Logged in</h1>
      <button onClick={logOutHandler}>Log Out</button>
    </div>
  );
}
