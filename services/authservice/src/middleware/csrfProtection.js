// Import the 'csurf' package to enable CSRF protection
const csurf = require('csurf');

// Initialize the CSRF protection middleware with the option to store the token in a cookie
// Setting { cookie: true } ensures that the CSRF token is stored as a cookie, which can be accessed on subsequent requests
const csrfProtection = csurf({ cookie: true });

// Export the csrfProtection middleware so it can be used in other parts of the application (e.g., in routes)
module.exports = { csrfProtection };
