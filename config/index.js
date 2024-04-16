const dotenv = require("dotenv");


dotenv.config()

module.exports = {
    PORT: process.env.PORT,
    DB_URL: process.env.DB_URL,
    JWT_secret:process.env.JWT_secret
};
