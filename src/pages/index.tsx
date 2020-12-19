import React, { useContext } from "react";
import { AuthContext } from "../contexts/Auth";

const Index = () => {
    const currentUser = useContext(AuthContext);

    return (
        <React.Fragment>
            <div>Hello, Nextjs!</div>
            <div>
                <p>ログイン済み</p>
                <p>ユーザーID： {currentUser.uid}</p>
            </div>
        </React.Fragment>
    );
};

export default Index;
