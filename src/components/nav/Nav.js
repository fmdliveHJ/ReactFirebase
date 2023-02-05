import React from "react";
import { Link } from "react-router-dom";
import styles from "./Nav.module.css";
import "normalize.css";
const Nav = () => {
  return (
    <nav className={styles.nav}>
      <h1 className={styles.title}>비밀일기</h1>
      <ul className={styles.list_nav}>
        <li>
          <Link to="/login">로그인</Link>
        </li>
        <li>
          <Link to="/Signup">가입하기 </Link>
        </li>
        <li></li>
      </ul>
    </nav>
  );
};

export default Nav;
