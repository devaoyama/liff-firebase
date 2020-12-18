import React, { useEffect, useState } from "react";
import Link from "next/link";

const Index = () => {
    const [isLogin, setLogin] = useState(false);

    useEffect(() => {
        setLogin(liff.isLoggedIn());
    });

    return (
        <React.Fragment>
            <div>Hello, Nextjs!</div>
            {isLogin ? <div>ログイン済み</div> : (
                <div>
                    ログインしていません
                    <Link href="/login">ログイン</Link>
                </div>
            )}
        </React.Fragment>
    );
};

export default Index;
