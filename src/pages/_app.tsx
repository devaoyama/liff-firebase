import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { Liff } from "@line/liff";
import "../styles/globals.css";

export type PageProps = {
  liff: Liff;
};

function MyApp({ Component, pageProps }: AppProps) {
  const [liffObject, setLiffObject] = useState<Liff | null>(null);
  const [liffError, setLiffError] = useState<string | null>(null);

  // Execute liff.init() when the app is initialized
  useEffect(() => {
    import("@line/liff").then((liff) => {
      const liffId = process.env.NEXT_PUBLIC_LIFF_ID;
      if (!liffId) {
        setLiffError("liff id is not found");
        return;
      }
      // to avoid `window is not defined` error
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

  if (liffObject === null) return <div>Loading</div>;
  if (liffError !== null) return <div>{liffError}</div>;

  pageProps.liff = liffObject;
  return <Component {...pageProps} />;
}

export default MyApp;
