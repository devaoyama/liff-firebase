import React, { useEffect, useState } from "react";
import Head from "next/head";

const Index = () => {
    const [isInit, setInit] = useState(false);
    const [isLogin, setLogin] = useState(false);

    useEffect(() => {
        if (isInit) return;
        liff.init({ liffId: process.env.LIFF_ID })
            .then(() => {
                setInit(true);
                setLogin(liff.isLoggedIn());
            })
        ;
    });

    return (
        <React.Fragment>
            <Head>
                <script charSet="utf-8" src="https://static.line-scdn.net/liff/edge/2/sdk.js"></script>
            </Head>
            <div>Hello, Nextjs!</div>
            {isLogin && <div>ログイン済み</div>}
        </React.Fragment>
    );
};

export default Index;
