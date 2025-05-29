const {logger} = require('../utils/logger')
exports.sendSms = async(phoneNumber, message)=>{
    // Example: Twilio or any SMS API integration
    logger.info(`Sending SMS to ${phoneNumber}: ${message}`)
}