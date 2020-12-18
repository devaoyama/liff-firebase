import { auth } from "../../utils/firebase-admin";

const Verify = async (req, res) => {
    const accessToken = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJodHRwczovL2lkZW50aXR5dG9vbGtpdC5nb29nbGVhcGlzLmNvbS9nb29nbGUuaWRlbnRpdHkuaWRlbnRpdHl0b29sa2l0LnYxLklkZW50aXR5VG9vbGtpdCIsImlhdCI6MTYwODI4MTkwOCwiZXhwIjoxNjA4Mjg1NTA4LCJpc3MiOiJmaXJlYmFzZS1hZG1pbnNkay1reTI0YkBsaWZmLWZpcmViYXNlLmlhbS5nc2VydmljZWFjY291bnQuY29tIiwic3ViIjoiZmlyZWJhc2UtYWRtaW5zZGsta3kyNGJAbGlmZi1maXJlYmFzZS5pYW0uZ3NlcnZpY2VhY2NvdW50LmNvbSIsInVpZCI6IlVmNDJiOTBjODdmN2FiYTlhZjBhNjM1NTZlN2NlNzIwMSJ9.dcQhgikrZ9y1dRpP1yp3TwEXcRnXUETXlArmj3x8x9Ddf-eIiLGydRNE1GmwANGcgtu3lJt58OXe2itLsdlNZEDYD-i8lF6YPmlacLqOIXEp0pWJCxcEtn_IJjYBNWcK-H3oSM8E9JzpIOnNNa1sy0Ah-Sa712R8M2g1fF0VOe8PeparD47NQDyPmuYzjU68Ky8INukizuftxhqOeUplLPTX1L4iIFYcLBx3R3t9KugHlTIfa7LaPT1EA8KVPgFjUWlEkFUkkszfZLvPMWlOPSslS0WrjcWx4KIcrbfpYg7lp5DpNATIt3eXeGwBPjxbD6kxreFNSoqF5-BRRivJsg'

    // アクセストークンの有効性を確認
    let response = await fetch('https://api.line.me/oauth2/v2.1/verify?access_token=' + accessToken);
    const data = await response.json();
    if (response.status !== 200) {
        res.status(401).send(data.error);
    }
    if (data.client_id !== '1655139136') {
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
