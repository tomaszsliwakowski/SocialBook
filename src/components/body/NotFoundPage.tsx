import React from "react";
import styles from "../../App.module.css";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
 return(
    <div className={styles.NotFoundPage} >
       <h2>Page not found</h2>
       <Link to="/SocialBook/">Home</Link>
    </div>
 )
}

export default NotFoundPage;