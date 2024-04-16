class ApiresponeHandler {
    static Success(res, message, result, status = 200) {
        res.status(status).json({ message: message, result: result });
    }

    static Error(res, message, status = 403) {
        res.status(status).json({ message: message });
    }
}

module.exports = ApiresponeHandler;
