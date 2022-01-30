import type { NextPage } from "next";
import Router from "next/router";
import { PageProps } from "./_app";
import styles from "../styles/Home.module.css";

const Login: NextPage<PageProps> = (props) => {
  if (props.isLoggedIn) {
    Router.push("/");
    return <div>Loading</div>;
  }
  return (
    <div className={styles.container}>
      <p>ログインしていません</p>
      <button onClick={() => props.liff.login()}>ログイン</button>
    </div>
  );
};

export default Login;
