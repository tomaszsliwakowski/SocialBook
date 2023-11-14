import React, { useContext, useState } from "react";
import "./SignInUp.css";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../../mutations/userMutations";
import { AuthContext, UserAuth } from "../../context/Auth";

export default function SignInForm() {
  const [state, setState] = useState({
    email: "",
    password: "",
  });
  const { setUser }: UserAuth = useContext(AuthContext);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setState({
      ...state,
      [e.target.name]: value,
    });
  };

  const [loginUser] = useMutation(LOGIN_USER, {
    variables: {
      email: state.email,
      password: state.password,
    },
    onCompleted(data) {
      setUser(data.loginUser);
    },
  });

  const handleOnSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const { email, password } = state;
    if (email !== "" && password !== "") {
      loginUser().then(() => setState({ email: "", password: "" }));
    }
    //alert(`You are login with email: ${email} and password: ${password}`);

    for (const key in state) {
      setState({
        ...state,
        [key]: "",
      });
    }
  };

  return (
    <div className="form-container sign-in-container">
      <form onSubmit={handleOnSubmit}>
        <h1>Sign in</h1>

        <input
          type="email"
          placeholder="Email"
          name="email"
          value={state.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={state.password}
          onChange={handleChange}
        />
        <a href="#">Forgot your password?</a>
        <button>Sign In</button>
      </form>
    </div>
  );
}
