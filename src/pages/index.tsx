import type { NextPage } from "next";
import { PageProps } from "./_app";
import styles from "../styles/Home.module.css";

const Home: NextPage<PageProps> = (props) => {
  const isLoggedIn = props.liff.isLoggedIn();
  return (
    <div className={styles.container}>
      {isLoggedIn ? (
        <>
          <p>ログインしています</p>
          <button onClick={() => props.liff.logout()}>ログアウト</button>
        </>
      ) : (
        <>
          <p>ログインしていません</p>
          <button onClick={() => props.liff.login()}>ログイン</button>
        </>
      )}
    </div>
  );
};

export default Home;
