const { sendEmail, sendVerificationEmail } = require("./send_mail");
const createTokenUser = require("./createTokenUser");
const { createJWT, isJWTvalid, attachCookiesToResponse } = require("./jwt");

module.exports = {
    sendEmail,
    sendVerificationEmail,
    createTokenUser,
    createJWT,
    isJWTvalid,
    attachCookiesToResponse,
};