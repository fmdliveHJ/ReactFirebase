import React, { useState } from "react";
import styles from "./Login.module.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleData = (e) => {
    if (e.target.type === "email") {
      setEmail(e.target.value);
    } else if (e.target.value === "password") {
      setPassword(e.target.value);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email, password);
  };

  return (
    <form className={styles.login_form} onSubmit={handleSubmit}>
      <fieldset>
        <legend> 로그인</legend>
        <label htmlFor="myEmail">email: </label>
        <input
          type="email"
          id="myEmail"
          required
          value={email}
          onChange={handleData}
        />
        <label htmlFor="myPassword">password:</label>
        <input
          type="password"
          id="myPassWord"
          required
          value={password}
          onChange={handleData}
        />
        <button type="submit" className={styles.button}>
          로그인
        </button>
      </fieldset>
    </form>
  );
};

export default Login;
