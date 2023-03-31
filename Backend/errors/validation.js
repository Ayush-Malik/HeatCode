const { StatusCodes } = require("http-status-codes");
const CustomAPIError = require("./custom-api");

class ValidationError extends CustomAPIError {
    constructor(message, errors) {
        super(message);
        this.name = "ValidationError";
        this.errors = errors.array();
        this.statusCode = StatusCodes.FORBIDDEN;
    }
}

module.exports = ValidationError;