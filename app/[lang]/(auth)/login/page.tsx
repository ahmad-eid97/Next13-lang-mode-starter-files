"use client"

import { login } from "./logic";

const Login = () => {
  return (
    <div>
      <h1>this is login page</h1>
      <button onClick={() => login()}>login</button>
    </div>
  )
}

export default Login;
