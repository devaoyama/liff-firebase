import React, { useContext } from "react";
import { useRouter } from "next/router";
import { AuthContext } from "../contexts/Auth";

const Login = () => {
    const isLoggedIn = useContext(AuthContext);

    const router = useRouter();

    if (isLoggedIn) {
        router.push('/');
    }

    const handleClick = () => {
        liff.login();
    };

    return (
        <React.Fragment>
            <div>
                <p>ログインしてください</p>
                <button onClick={handleClick}>ログイン</button>
            </div>
        </React.Fragment>
    );
};

export default Login;
