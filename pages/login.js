import axios from "axios";
import { signIn } from "next-auth/react";
import React, { useState } from "react";
import { useRouter } from "next/router";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const submitHandler = async (e) => {
    e.preventDefault();
    const result = await signIn("credentials", {
      redirect:false,
      email: email.toLowerCase(),
      password: password,
    });
    console.log(result);
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={submitHandler}>
        <div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          {" "}
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
