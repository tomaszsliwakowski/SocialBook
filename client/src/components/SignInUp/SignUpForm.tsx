import React, { useContext } from "react";
import "./SignInUp.css";
import { REGISTER_USER } from "../../mutations/userMutations";
import { useMutation } from "@apollo/client";
import { AuthContext, UserAuth } from "../../context/Auth";
import { useNavigate } from "react-router-dom";

export default function SignUpForm() {
  const [state, setState] = React.useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { refetchUser }: UserAuth = useContext(AuthContext);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setState({
      ...state,
      [e.target.name]: value,
    });
  };

  const [registerUser] = useMutation(REGISTER_USER, {
    variables: {
      name: state.name,
      email: state.email,
      password: state.password,
    },
    onCompleted() {
      refetchUser();
    },
  });

  const handleOnSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const { name, email, password } = state;

    if (email !== "" && password !== "" && name !== "") {
      registerUser().then(() => {
        setState({ name: "", email: "", password: "" });
        navigate("/");
      });
    }

    for (const key in state) {
      setState({
        ...state,
        [key]: "",
      });
    }
  };

  return (
    <div className="form-container sign-up-container">
      <form onSubmit={handleOnSubmit}>
        <h1>Create Account</h1>
        <input
          type="text"
          name="name"
          value={state.name}
          onChange={handleChange}
          placeholder="Name"
        />
        <input
          type="email"
          name="email"
          value={state.email}
          onChange={handleChange}
          placeholder="Email"
        />
        <input
          type="password"
          name="password"
          value={state.password}
          onChange={handleChange}
          placeholder="Password"
        />
        <button className="signUp">Sign Up</button>
      </form>
    </div>
  );
}
