const querystring = require('querystring');

async function verifyId(code){
    console.log('verifyID called')
    const clientId = process.env.CLIENT_ID;
    const clientSecret = process.env.CLIENT_SECRET;
    const cognitoDomain = 'ap-southeast-1rbjrxsumu';
    const region = 'ap-southeast-1';
    const tokenUrl = `https://${cognitoDomain}.auth.${region}.amazoncognito.com/oauth2/token`;
    try{
          // Prepare the request body to exchange the code for tokens
    const body = querystring.stringify({
        grant_type: 'authorization_code',
        client_id: clientId,
        code: code,
        redirect_uri: `${process.env.REDIRECT_URI}`,
      });
  
      // Prepare the request headers, including authorization if using a client secret
      const headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: 'Basic ' + Buffer.from(`${clientId}:${clientSecret}`).toString('base64'),
       
      };
  
      // Send the request to get the tokens (id_token, access_token, refresh_token)
      const response = await fetch(tokenUrl, {
        method: 'POST',
        headers: headers,
        body: body,
      });

  
      // If the request failed, throw an error
      if (!response.ok) {
        const errorResponse = await response.text();  // Get the error response body
        throw new Error(`Failed to exchange authorization code for tokens: ${errorResponse}`);
      }
      
      // Parse the response body as JSON
      const data = await response.json();

      // Return the parsed data (id_token, access_token, refresh_token)
      return data;
    }catch(e){  
        console.log('error',e)
    }
}

module.exports = { verifyId };