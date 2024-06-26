import React, { useState } from "react";

function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  function handleRegistration(ev) {
    ev.preventDefault();
    console.log(
      `registered! UserName:${username}, Password: ${password}, FirstName: ${firstName}, LastName: ${lastName}`
    );
  }
  return (
    <>
      <form onSubmit={handleRegistration}>
        <h1>Register to our Market-Shop</h1>
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
        <div>
          <label htmlFor="">First Name</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="border border-neutral-950"
            placeholder="Enter First Name..."
          />
        </div>
        <div>
          <label htmlFor="">Last Name</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="border border-neutral-950"
            placeholder="Enter Last Name..."
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </>
  );
}

export default RegisterPage;
