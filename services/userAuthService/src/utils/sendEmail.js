const {logger} = require('../utils/logger')
exports.sendEmail = async(email, message)=>{
    // Example: Twilio or any Email API integration
    logger.info(`Sending email to ${email}: ${message}`)
}