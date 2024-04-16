const { isCelebrateError } = require("celebrate");


function JoiValidation(err, req, res, next) {
    if (isCelebrateError(err)) {
        const details = [];
        err.details.forEach((error1) =>
            error1.details.forEach((value) => details.push(value.message))
        );
        console.log("details", details);
        const data = {
            message: details.join(","),
        };
        return res.status(422).json(data);
    }
    return next(err);
}

module.exports = JoiValidation;
