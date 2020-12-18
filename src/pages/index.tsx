import React, { useContext } from "react";
import Link from "next/link";
import { AuthContext } from "../contexts/Auth";

const Index = () => {
    const currentUser = useContext(AuthContext);

    return (
        <React.Fragment>
            <div>Hello, Nextjs!</div>
            {currentUser ? (
                <div>
                    <p>ログイン済み</p>
                    <p>ユーザーID： {currentUser.uid}</p>
                </div>
            ) : (
                <div>
                    ログインしていません
                    <Link href="/login">ログイン</Link>
                </div>
            )}
        </React.Fragment>
    );
};

export default Index;
