const ApiresponeHandler = require("../../service/ApiresponseHandler");
const UserModel = require("../../dbSchema/userModel");
const bcrypt = require ("bcrypt")
const jwtService = require("../../service/jwtservice")

const authController = {
    register: async (req, res, next) => {
        try {
            const { name, email, password } = req.body;
            const hashPassword= await bcrypt.hash(password,12)
            const user = new UserModel({ name, email, password:hashPassword });
            console.log("user",user)
            const result = await user.save();
            const access_token= await jwtService.signin({id:result.id, role:result.role})
            res.json({ message: "User registered successfully", user: result,access_token });
        } catch (err) {
            ApiresponeHandler.Error(res, err.errorResponse.errmsg); // Better error handling
        }
    }
};

module.exports = authController;
