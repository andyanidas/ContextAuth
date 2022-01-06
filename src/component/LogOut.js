import React from "react";
import style from "../css/style.css";
import { useUser } from "./UserContext";

export default function LogOut() {
  // const [user, setUser] = useUser();
  return (
    <div class="logout">
      <h1>Logged out</h1>
      <h2>{}</h2>
    </div>
  );
}
