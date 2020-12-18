import React, { createContext, useEffect, useState } from "react";
import { useRouter } from "next/router";

export const AuthContext = createContext<boolean>(true);

const Auth = ({ children }) => {
    const [isLoggedIn, setLoggedIn] = useState(undefined);

    const router = useRouter();

    useEffect(() => {
        setLoggedIn(liff.isLoggedIn());
    }, []);

    if (isLoggedIn || router.pathname === '/login') {
        return (
            <AuthContext.Provider value={isLoggedIn}>
                {children}
            </AuthContext.Provider>
        );
    }

    if (isLoggedIn === false) {
        router.push('/login');
    }

    return <div>Loading...</div>
};

export default Auth;
