import React from "react";
import LiffInit from "../components/LiffInit";

const App = ({ Component, pageProps }) => {
    return (
        <React.Fragment>
            <LiffInit>
                <Component {...pageProps} />
            </LiffInit>
        </React.Fragment>
    );
}

export default App;
