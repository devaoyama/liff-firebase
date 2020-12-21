import React, { createContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { auth } from "../utils/firebase";
import firebase from "firebase/app";

export const AuthContext = createContext<firebase.User | null | undefined>(undefined);

const Auth = ({ children }) => {
    const [currentUser, setCurrentUser] = useState<firebase.User | null | undefined>(undefined);

    const router = useRouter();

    useEffect(() => {
        if (!liff.isLoggedIn()) {
            router.push('/login');
            return;
        }
        auth.onAuthStateChanged(user => {
            if (user) {
                setCurrentUser(user);
            } else {
                fetch('/api/verify', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        idToken: liff.getIDToken(),
                    }),
                }).then(response => {
                    response.text().then(data => {
                        console.log(data);
                        auth.signInWithCustomToken(data).then(response => {
                            const user = response.user;
                            setCurrentUser(user);
                        });
                    });
                });
            }
        });
    }, []);

    if (currentUser || router.pathname === '/login') {
        return (
            <AuthContext.Provider value={currentUser}>
                {children}
            </AuthContext.Provider>
        );
    }

    if (currentUser === null) {
        router.push('/login');
    }

    return <div>Loading...</div>
};

export default Auth;
