import React, { useContext } from "react";
import { useState } from "react";
import H from "../../UI/H";
import Input from "../../UI/Input";
import Button from "../../UI/Button";
import { LogIn } from "lucide-react";
import axios from "axios";
import { AUTH_BASE_URL } from "../../constansts/url.constant";
import { UserContext } from "../../contexts/UserContext";
import { useNavigate } from "react-router";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleLogin(ev) {
    ev.preventDefault();

    try {
      const res = await axios.post(`${AUTH_BASE_URL}/login`, {
        username,
        password,
      });
      console.log(
        `Successfull login! UserName:${username}, Password: ${password}`
      );
      console.log(res);
      const { token } = res.data;
      localStorage.setItem("token", token);
      setTimeout(() => {
        navigate("/", { replace: true });
      }, 2000);
    } catch (error) {
      console.log(error);
    }
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
