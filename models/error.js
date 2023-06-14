class Error {
    constructor(message) {
        this.error = {
            code: "ERR001",
            message: message
        }
    }
}

module.exports = Error;