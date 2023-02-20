import React from "react";

import styles from "../../App.module.css";
import { useForm } from "react-hook-form";
import { signInWithEmailAndPassword} from "firebase/auth";
import { auth } from "../../firebase/firebase-config";


type Inputs = {
  email: string;
  password: string;
};

const LoginPage = () => {
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
    } catch (error: any) {
      console.log(error.message);
    }
  };
  return (
    <>
      <div className={styles.LoginPage}>
        <h2>Login</h2>
        <form onSubmit={handleSubmit(onSubmitt)}>
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
          <button className={styles.logBtn}>Register</button>
        </span>
      </div>
    </>
  );
};

export default LoginPage;
