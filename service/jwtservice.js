const jwt = require("jsonwebtoken")
const { JWT_secret } = require("../config");

class jwtService {
    static signin(payload,expiry="360000s",secret='secret'){
        return jwt.sign(payload,secret,{expiresIn:expiry})
    }
    static verify(token,secret='secret'){
        return jwt.verify(token,secret)
    }
}
module.exports = jwtService