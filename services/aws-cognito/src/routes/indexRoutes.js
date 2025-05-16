const express = require('express');
const router = express.Router();
const { checkAuth } = require('../middleware/authMiddleware');
const {verifyId} =  require('../utility/utils')

router.get('/', checkAuth, (req, res) => {
    console.log('home called',req.isAuthenticated, req.session.userInfo)
    res.render('home', {
        isAuthenticated: req.isAuthenticated,
        userInfo: req.session.userInfo,
    });
});


/* 
test in postman
after login you will be redirected to
> https://naseerkhan.dev/?code=d50b7b1d-4968-4e55-8a03-2c05287d96ee&state=s7hgcr3bmXxygV8aM3umqHmUmu6McCtBB8OaavhBVEQ

open post man 
get
http://localhost:3000/verify?code=d50b7b1d-4968-4e55-8a03-2c05287d96ee&state=s7hgcr3bmXxygV8aM3umqHmUmu6McCtBB8OaavhBVEQ
*/
router.get('/verify',async(req,res)=>{
    const code = req.query.code;  // Get 'code' from the URL
    if (!code) {
        return res.status(400).send('Missing authorization code.');
      }
    console.log('code',code)
    const token = await verifyId(code)  
    res.status(200).json({ message: 'OK', token:token.id_token }); // Sends a JSON response
})

module.exports = router;
