import React, { useContext, useState } from "react";
import "./SignInUp.css";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../../mutations/userMutations";
import { AuthContext, UserAuth } from "../../context/Auth";
import { useNavigate } from "react-router-dom";
import { GraphQLError } from "graphql";
import toast, { Toaster } from "react-hot-toast";

export default function SignInForm() {
  const navigate = useNavigate();
  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const { refetchUser }: UserAuth = useContext(AuthContext);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setState((prev) => ({
      ...prev,
      [e.target.name]: value,
    }));
  };

  const [loginUser] = useMutation(LOGIN_USER, {
    variables: {
      email: state.email,
      password: state.password,
    },
    onCompleted() {
      refetchUser();
    },
  });

  const handleOnSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { email, password } = state;
    if (email !== "" && password !== "") {
      loginUser()
        .then((res) => {
          const response = res.data;
          if (response.loginUser) {
            setState({ email: "", password: "" });
            navigate("/");
          }
        })
        .catch((res: GraphQLError) => {
          toast.error(res.message);
        });
    }

    for (const key in state) {
      setState((prev) => ({
        ...prev,
        [key]: "",
      }));
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
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
}
