import { auth } from "../../utils/firebase-admin";
import qs from "querystring";

const Verify = async (req, res) => {
    // const accessToken = req.body.accessToken;

    const idToken = req.body.idToken;

    // // アクセストークンの有効性を確認
    // let response = await fetch('https://api.line.me/oauth2/v2.1/verify?access_token=' + accessToken);
    // const data = await response.json();
    // if (response.status !== 200) {
    //     res.status(401).send(data.error);
    // }
    // if (data.client_id !== process.env.LIFF_CHANNEL_ID) {
    //     res.status(400).send('Invalid Channel Id');
    // }
    // if (data.expires_in < 0) {
    //     res.status(400).send('Access Token is expired');
    // }
    //
    // // LINEのプロフィールを取得
    // response = await fetch('https://api.line.me/v2/profile', {
    //     headers: {
    //         'Authorization': `Bearer ${accessToken}`,
    //     },
    // });
    // const profile = await response.json();
    // if (response.status !== 200) {
    //     res.status(401).send(profile.error);
    // }

    const response = await fetch('https://api.line.me/oauth2/v2.1/verify', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: qs.stringify({
            id_token: idToken,
            client_id: process.env.LIFF_CHANNEL_ID,
        }),
    });
    const profile = await response.json();

    // firebaseトークンを発行してレスポンス
    const token = await auth.createCustomToken(profile.sub);
    res.status(200).send(token);
};

export default Verify;
