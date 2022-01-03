import logo from "./logo.svg";
import "./App.css";
import React, { useState, useEffect } from "react";
import Login from "./component/Login";
import LogOut from "./component/LogOut";
import { useUser } from "./component/UserContext";
function App() {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  const [user, setUser] = useUser();
  function setToken(userToken) {
    sessionStorage.setItem("token", JSON.stringify(userToken));
  }
  useEffect(() => {
    if (getToken()) {
      setUser({ username: "old user" });
    }
  }, []);

  function getToken() {
    const tokenString = sessionStorage.getItem("token");
    const userToken = JSON.parse(tokenString);

    return userToken;
  }

  const loginUser = async (credentials) => {
    return fetch("http://52.221.191.153/admin/login	", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    })
      .then((response) => response.json())
      .then((data) => {
        setToken(data.token);
      })

      .catch((e) => {
        console.log(e);
      });
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    const token = await loginUser({
      email: username,
      password: password,
      // name: "asd",
      // email: "asd",
      // address: "asd",
    });
    setUser({ username: username, password: password });
  };
  return (
    <div className="App">
      <form onSubmit={submitHandler}>
        <label>
          <p>Username</p>
          <input type="text" onChange={(e) => setUserName(e.target.value)} />
        </label>
        <label>
          <p>Password</p>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
        <div></div>
      </form>
      <button
        onClick={() => {
          console.log("clearing season storage");
          sessionStorage.clear();
        }}
      >
        Log Out
      </button>
      {user?.username ? <Login /> : <LogOut />}
    </div>
  );
}

export default App;
