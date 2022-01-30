import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { Liff } from "@line/liff";
import { User } from "firebase/auth";
import { initialize } from "../utils/firebase";
import { useAuth } from "../hooks/useAuth";
import "../styles/globals.css";

initialize();

export type PageProps = {
  liff: Liff;
  authUser: User | null;
  isLoggedIn: boolean;
  logout: () => void;
};

function MyApp({ Component, pageProps }: AppProps) {
  const [liffObject, setLiffObject] = useState<Liff | null>(null);
  const [liffError, setLiffError] = useState<string | null>(null);
  const { authUser, isLoading, isLoggedIn, logout } = useAuth({
    liff: liffObject,
  });

  // Execute liff.init() when the app is initialized
  useEffect(() => {
    // to avoid `window is not defined` error
    import("@line/liff").then((liff) => {
      const liffId = process.env.NEXT_PUBLIC_LIFF_ID;
      if (!liffId) {
        setLiffError("liff id is not found");
        return;
      }
      liff
        .init({ liffId })
        .then(() => {
          setLiffObject(liff);
        })
        .catch((error) => {
          setLiffError(error.toString());
        });
    });
  }, []);

  if (liffObject === null || isLoading) return <div>Loading</div>;
  if (liffError !== null) return <div>{liffError}</div>;

  pageProps.liff = liffObject;
  pageProps.authUser = authUser;
  pageProps.isLoggedIn = isLoggedIn;
  pageProps.logout = logout;
  return <Component {...pageProps} />;
}

export default MyApp;
