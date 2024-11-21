const {
    createLogger,
    transports,
    format
} = require("winston");
const TelegramLogger = require('winston-telegram')
const logger = require("winston");

logger.add(new TelegramLogger({
    token: "840206110:AAF938YsOhLWt7yjG7MmiMWl2XsTU_4k9_0",
    chatId: "114802523",
    json: true,
    formatMessage: function (options) {        
        return "argos_raw\n" + process.env.BASE_URL + "\n" + JSON.stringify(options.message, null, 4);
      }
    
}))


module.exports = logger