import React, { useState } from "react";
import H from "../../UI/H";
import Input from "../../UI/Input";
import Button from "../../UI/Button";
import { Check } from "lucide-react";
import axios from "axios";
import { AUTH_BASE_URL } from "../../constansts/url.constant";

function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  async function handleRegistration(ev) {
    ev.preventDefault();

    try {
      await axios.post(`${AUTH_BASE_URL}/register`, {
        username,
        password,
        firstName,
        lastName,
      });
      console.log(
        `registered! UserName:${username}, Password: ${password}, FirstName: ${firstName}, LastName: ${lastName}`
      );
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="flex justify-center items-center p-6">
      <form
        onSubmit={handleRegistration}
        className="w-[30%] shadow-2xl mt-24 p-12 flex flex-col space-y-6 items-center rounded-3xl border border-indigo-400"
      >
        <H three>Register to our Market-Shop</H>
        <div>
          <H register>Username</H>
          <Input
            register
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border border-neutral-950"
            placeholder="Enter Username..."
          />
        </div>
        <div>
          <H register>Password</H>
          <Input
            register
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-neutral-950"
            placeholder="Enter Password..."
          />
        </div>
        <div>
          <H register>First Name</H>
          <Input
            register
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="border border-neutral-950"
            placeholder="Enter First Name..."
          />
        </div>
        <div>
          <H register>Last Name</H>
          <Input
            register
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className=""
            placeholder="Enter Last Name..."
          />
        </div>
        <Button
          shop
          type="submit"
          className="flex justify-center items-center gap-2"
        >
          Register <Check size={20} color="#ffffff" strokeWidth={1.5} />
        </Button>
      </form>
    </div>
  );
}

export default RegisterPage;
