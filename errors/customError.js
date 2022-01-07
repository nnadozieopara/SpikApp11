// extending the error with jsx
class CustomAPIError extends Error {
    constructor(message) {
        super(message);
    }
}

module.exports = CustomAPIError;