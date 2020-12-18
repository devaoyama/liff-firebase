import React, {useEffect, useState} from "react";
import Head from "next/head";

const LiffInit = ({ children }) => {
    const [isInit, setInit] = useState(false);

    useEffect(() => {
        liff.init({ liffId: process.env.LIFF_ID })
            .then(() => {
                setInit(true);
            })
        ;
    }, []);

    return (
        <React.Fragment>
            <Head>
                <script charSet="utf-8" src="https://static.line-scdn.net/liff/edge/2/sdk.js"></script>
            </Head>
            {isInit ? (
                children
            ) : (
                <div>Loading...</div>
            )}
        </React.Fragment>
    );
};

export default LiffInit;
