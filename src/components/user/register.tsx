import React,{useState,useEffect} from "react";
import styles from "../../App.module.css";
import { useForm } from "react-hook-form";
import { createUserWithEmailAndPassword} from "firebase/auth";
import { auth } from "../../firebase/firebase-config";
import { Link } from "react-router-dom";
import { collection, addDoc ,getDocs} from "firebase/firestore";
import { db} from "../../firebase/firebase-config";
import { UserType } from "../post/post";

type Inputs = {
 username:string;
  email: string;
  password: string;
};

const RegisterPage = () => {
    const [user, setuser] = useState<Array<UserType>>([]);
    const UsersCollectionRef = collection(db, "Users");
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmitt = (values: Inputs) => {
    registerUser(values);
  };

  const getUser = async ()=>{
    const UsersData = await getDocs(UsersCollectionRef);
    const Users: any = UsersData.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    })); 
    setuser(Users);
  }
  useEffect(()=>{
    getUser()
  },[])

  console.log(user)

  const registerUser = async (values: Inputs) => {
    const {email,password,username} = values
    const foundUserEmail:UserType[] = user.filter((item)=> item.email === email)
    const foundUserName:UserType[] = user.filter((item)=> item.username === username)
    try {
        if(foundUserEmail.length < 1 && foundUserName.length < 1){
            await createUserWithEmailAndPassword(
                auth,
                email,
                password
              ).then(
                async (reasult) =>{
                    try{
                        await addDoc(UsersCollectionRef,{
                         username,
                         email,
                         password,
                         userID: `${reasult.user.uid}`
                        })
                        reset({username:"",
                        email:"",
                        password:""
                    })
                    alert("Wellcome new User create successfully")
                    } catch (error:any){
                        console.log(error.message)
                    }
                }
              )
        }else{
            if(foundUserEmail.length > 0){
                alert(`Account with the email ${email} already exist`)
             }else if(foundUserName.length > 0){
                alert(`Account with the Name ${username} already exist`)
            }else{
                alert(`Account with the Name ${username} and email ${email} already exist`)
            }
        }
    } catch (error: any) {
      console.log(error.message);
    }
  };
  return (
    <>
      <div className={styles.LoginPage}>
        <h2>Register</h2>
        <form onSubmit={handleSubmit(onSubmitt)}>
        <label>
            <input
              type="username"
              placeholder="UserName"
              {...register("username", {
                required: "Required",
              })}
            />
            {errors.username && (
              <span className={styles.error}>{errors.username.message}</span>
            )}
          </label>
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
            Register
          </button>
        </form>
        <span>
          <p>You have an account, please login</p>
          <Link to="/login" className={styles.logBtn}>Login</Link>
        </span>
      </div>
    </>
  );
};

export default RegisterPage;
