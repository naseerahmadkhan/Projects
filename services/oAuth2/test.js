const oidc = require('oidc-provider');
const provider = new oidc.Provider("http://localhost:3000", {
    // refer to the documentation for other available configuration
    clients: [
      {
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uris: ["http://localhost:3000/success"],
        // ... other client properties
      },
    ],
  });
  
  const server = oidc.listen(3000, () => {
    console.log(
      "oidc-provider listening on port 3000, check http://localhost:3000/.well-known/openid-configuration",
    );
  });