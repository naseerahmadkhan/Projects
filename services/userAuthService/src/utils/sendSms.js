const {logger} = require('../utils/logger')
exports.sendSms = (user)=>{
    const message = `Email is sent successfully! to ${user}`;
    logger.info(message)
}