import React, { useState } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import styles from "../../App.module.css";
import { useForm } from "react-hook-form";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebase-config";
import { Link } from "react-router-dom";
import { Inputs } from "../types/type";

const LoginPage = () => {
  const [logFail, setlogFail] = useState<boolean>(false);
  const naviagte: NavigateFunction = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmitt = (values: Inputs) => {
    login(values);
  };

  const login = async (values: Inputs) => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      setlogFail(false);
      naviagte("/SocialBook/");
    } catch (error: any) {
      console.log(error.message);
      setlogFail(true);
    }
  };
  return (
    <>
      <div className={styles.LoginPage}>
        <h2>Login</h2>
        <form onSubmit={handleSubmit(onSubmitt)}>
          {logFail ? (
            <p className={styles.LogFail}>Email or password is incorrect</p>
          ) : null}
          <label>
            <input
              type="email"
              placeholder="Email"
              {...register("email", {
                required: "Required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "invalid email address",
                },
              })}
            />
            {errors.email && (
              <span className={styles.error}>{errors.email.message}</span>
            )}
          </label>
          <label>
            <input
              type="password"
              placeholder="Password"
              {...register("password", {
                required: "Required",
              })}
            />
            {errors.password && (
              <span className={styles.error}>{errors.password.message}</span>
            )}
          </label>
          <button type="submit" className={styles.logBtn}>
            Login
          </button>
        </form>
        <span>
          <p>You don't have an account, please register</p>
          <Link to="/SocialBook/register" className={styles.logBtn}>
            Register
          </Link>
        </span>
      </div>
    </>
  );
};

export default LoginPage;
