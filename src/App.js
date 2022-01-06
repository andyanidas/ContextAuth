import logo from "./logo.svg";
import "./App.css";
import React, { useState, useEffect } from "react";
import Login from "./component/Login";
import LogOut from "./component/LogOut";
import { useUser } from "./component/UserContext";
import reportWebVitals from "./reportWebVitals";

function App() {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  //custom hookeesee share hiisen zuilsee gargaj avch baina
  const [user, setUser] = useUser();

  function setToken(userToken) {
    if (userToken) localStorage.setItem("token", JSON.stringify(userToken));
  }
  useEffect(() => {
    if (getToken()) {
      setUser({ username: "old user" });
    }
  }, []);

  function getToken() {
    const tokenString = localStorage.getItem("token");
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
        if (data.token) {
          setToken(data.token);
          setUser({ username: username, password: password });
        } else {
          alert("failed to optain login");
        }
      })
      .catch((e) => {
        alert(e);
        console.log(e);
      });
  };
  const registerUser = async (credentials) => {
    return fetch("http://52.221.191.153/admin/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    })
      .then((response) => {
        response.json();
      })
      .catch((e) => {
        alert(e);
        console.log(e);
      });
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    const token = await loginUser({
      email: username,
      password: password,
    });
  };
  const registerHandler = async (event) => {
    event.preventDefault();
    const token = await registerUser({
      email: username,
      password: password,
      name: "asd",
      // email: "asd",
      address: "asd",
    });
  };
  return (
    <div className="App">
      <form onSubmit={submitHandler}>
        <h1>Login Form</h1>
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
      </form>
      <button
        onClick={() => {
          localStorage.clear();
        }}
      >
        Log Out
      </button>
      {user?.username ? <Login /> : <LogOut />}

      <form onSubmit={registerHandler}>
        <h1>Register Form</h1>
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
      </form>
    </div>
  );
}

export default App;
