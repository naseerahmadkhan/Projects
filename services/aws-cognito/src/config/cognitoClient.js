const { Issuer } = require('openid-client');

let client;

async function getClient() {
    if (!client) {
        const issuer = await Issuer.discover('https://cognito-idp.ap-southeast-1.amazonaws.com/ap-southeast-1_RbJRXSumu');
            client = new issuer.Client({
                client_id: process.env.CLIENT_ID,
                client_secret: process.env.CLIENT_SECRET,
                redirect_uris: [`${process.env.REDIRECT_URI}`],
                response_types: ['code']
            });
    }
    return client;
}

module.exports = getClient;
