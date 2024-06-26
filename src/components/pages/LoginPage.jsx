import React from "react";
import { useState } from "react";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  function handleLogin(ev) {
    ev.preventDefault();
    console.log(
      `Successfull login! UserName:${username}, Password: ${password}`
    );
  }
  return (
    <>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border border-neutral-950"
            placeholder="Enter Username..."
          />
        </div>
        <div>
          <label htmlFor="">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-neutral-950"
            placeholder="Enter Password..."
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </>
  );
}

export default LoginPage;
