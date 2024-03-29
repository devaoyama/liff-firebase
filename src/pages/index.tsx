import type { NextPage } from "next";
import Router from "next/router";
import { PageProps } from "./_app";
import styles from "../styles/Home.module.css";

const Home: NextPage<PageProps> = (props) => {
  if (!props.isLoggedIn) {
    Router.push("/login");
    return <div>Loading</div>;
  }
  return (
    <div className={styles.container}>
      <p>ログインしています</p>
      <button onClick={() => props.logout()}>ログアウト</button>
    </div>
  );
};

export default Home;
