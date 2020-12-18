import { auth } from "../../utils/firebase-admin";

const Verify = async (req, res) => {
    const accessToken = req.body.accessToken;

    // アクセストークンの有効性を確認
    let response = await fetch('https://api.line.me/oauth2/v2.1/verify?access_token=' + accessToken);
    const data = await response.json();
    if (response.status !== 200) {
        res.status(401).send(data.error);
    }
    if (data.client_id !== process.env.LIFF_CHANNEL_ID) {
        res.status(400).send('Invalid Channel Id');
    }
    if (data.expires_in < 0) {
        res.status(400).send('Access Token is expired');
    }

    // LINEのプロフィールを取得
    response = await fetch('https://api.line.me/v2/profile', {
        headers: {
            'Authorization': `Bearer ${accessToken}`,
        },
    });
    const profile = await response.json();
    if (response.status !== 200) {
        res.status(401).send(profile.error);
    }

    // firebaseトークンを発行してレスポンス
    const token = await auth.createCustomToken(profile.userId);
    res.status(200).send(token);
};

export default Verify;
