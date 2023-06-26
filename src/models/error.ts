export default class Error {
    error: {
        code: string;
        message: string;
    };

    constructor(message: string) {
        this.error = {
            code: "ERR001",
            message: message
        }
    }
}
