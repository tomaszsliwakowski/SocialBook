import React from "react";
import styles from "../../App.module.css";
import { SiGmail } from "react-icons/si";
import { FaPhoneAlt } from "react-icons/fa";
const Footer = () => {
  return (
    <div className={styles.Footer}>
      <span>
        <h3>SocialBook</h3>
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Recusandae nulla nostrum fugit temporibus debitis vero ipsam ad soluta? Commodi cum error odit illum nemo voluptate quam harum aut sapiente alias.</p>
      </span>
      <span>
      <a href="tel: 530786458">
          <p>
            <FaPhoneAlt />
            <i>530-786-458</i>
          </p>
        </a>
        <a href="shop@gmail.com">
          <p>
            <SiGmail />
            <i> SocialBook@gmail.com</i>
          </p>
        </a>
      </span>
    </div>
  );
};

export default Footer;
