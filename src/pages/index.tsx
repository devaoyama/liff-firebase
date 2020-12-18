import React, { useEffect, useState } from "react";

const Index = () => {
    const [isLogin, setLogin] = useState(false);

    useEffect(() => {
        setLogin(liff.isLoggedIn());
    });

    return (
        <React.Fragment>
            <div>Hello, Nextjs!</div>
            {isLogin ? <div>ログイン済み</div> : <div>ログインしていません</div>}
        </React.Fragment>
    );
};

export default Index;
