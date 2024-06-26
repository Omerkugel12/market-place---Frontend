import React from "react";
import { useState } from "react";
import H from "../../UI/H";
import Input from "../../UI/Input";
import Button from "../../UI/Button";
import { LogIn } from "lucide-react";

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
      <div className="flex justify-center items-center p-6">
        <form
          onSubmit={handleLogin}
          className="w-[30%] shadow-2xl mt-24 p-12 flex flex-col space-y-6 items-center rounded-3xl border border-indigo-400"
        >
          <H three>Login</H>
          <div>
            <H register htmlFor="">
              Username
            </H>
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
            <H register htmlFor="">
              Password
            </H>
            <Input
              register
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-neutral-950"
              placeholder="Enter Password..."
            />
          </div>
          <Button shop type="submit" className="flex gap-1 items-center">
            Login <LogIn size={20} color="#ffffff" strokeWidth={1.5} />
          </Button>
        </form>
      </div>
    </>
  );
}

export default LoginPage;
