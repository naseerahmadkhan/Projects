const getClient = require('../config/cognitoClient');
const { generators } = require('openid-client');

exports.login = async (req, res) => {
    const client = await getClient();
    const nonce = generators.nonce();
    const state = generators.state();

    req.session.nonce = nonce;
    req.session.state = state;

    const authUrl = client.authorizationUrl({
        scope: 'openid email phone',
        state,
        nonce,
    });

    res.redirect(authUrl);
};

exports.callback = async (req, res) => {
    try {
        const client = await getClient();
        const params = client.callbackParams(req);

        const tokenSet = await client.callback(
            process.env.REDIRECT_URI,
            params,
            {
                nonce: req.session.nonce,
                state: req.session.state,
            }
        );

        const userInfo = await client.userinfo(tokenSet.access_token);
        req.session.userInfo = userInfo;

        res.redirect('/');
    } catch (err) {
        console.error('Callback error:', err);
        res.redirect('/');
    }
};

exports.logout = (req, res) => {
    req.session.destroy(() => {
        // const logoutUrl = `${process.env.COGNITO_ISSUER.replace('cognito-idp', 'auth')}/logout?client_id=${process.env.CLIENT_ID}&logout_uri=${process.env.LOGOUT_URI}`;
        const logoutUrl = 'https://ap-southeast-1rbjrxsumu.auth.ap-southeast-1.amazoncognito.com/logout?client_id=p186oloa5msotkkqieumo81ha&logout_uri=http://localhost:3000';
        res.redirect(logoutUrl);
    });
};
