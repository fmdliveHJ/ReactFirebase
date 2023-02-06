import React, { useState } from "react";
import { useLogin } from "../../hooks/useLogin";
import styles from "./Login.module.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { error, isPending, login } = useLogin();

  const handleData = (e) => {
    if (e.target.type === "email") {
      setEmail(e.target.value);
    } else if (e.target.type === "password") {
      setPassword(e.target.value);
    }
  };
  //   const handleData = (event) => {
  //     if (event.target.type === "email") {
  //         setEmail(event.target.value);
  //     } else if (event.target.type === "password") {
  //         setPassword(event.target.value);
  //     }
  // }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email, password);
    login(email, password);
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
        <label htmlFor="myPassword">password1:</label>
        <input
          type="password"
          id="myPassWord"
          required
          value={password}
          onChange={handleData}
        />
        {!isPending && (
          <button type="submit" className={styles.button}>
            로그인
          </button>
        )}
        {isPending && <strong>로그인 진행중입니다..</strong>}
        {error && <strong>{error}</strong>}
      </fieldset>
    </form>
  );
};

export default Login;
