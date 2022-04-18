import React, { useState } from "react";
//import { useNavigate } from 'react-router-dom';


async function loginUser(credentials) {
  try {
    const response = await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
    return response;
  } catch (err) {
    console.log(err)
  }
}

export default function LandingPage({ setAuth }) {
  //const navigate = useNavigate();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async e => {
    e.preventDefault();
    try {
    const response = await loginUser({
      username: username,
      password: password
    });

    const parseRes = await response.json();
    console.log(parseRes.id);

      if (parseRes.jwtToken) {
        localStorage.setItem("token", parseRes.jwtToken);
        setAuth = true;
        console.log("Logged in Successfully");
        //navigate(`/profile/${parseRes.id}`)
      } else {
        setAuth = false;
        console.log(parseRes);
      }
    } catch (err) {
      console.error(err.message);
    }
  }

  return (
    <div>
      <h1> Landing Page </h1>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            id="email"
            name="username"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}
