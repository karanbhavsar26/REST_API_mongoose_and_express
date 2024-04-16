const UserModel = require('../../dbSchema/userModel');
const ApiresponeHandler = require("../../service/ApiresponseHandler");
const jwtService = require("../../service/jwtservice");
const bcrypt = require("bcrypt");

const loginController = {
    login: async (req, res, next) => {
        try {
            const { email, password } = req.body;

            const user = await UserModel.findOne({ email: email });

            if (!user) {
                return ApiresponeHandler.Error(res, "User not found");
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return ApiresponeHandler.Error(res, "Invalid password");
            }

            const userObject = user.toObject();
            delete userObject.password;

            const access_token = await jwtService.signin({ id: user._id, role: user.role });

            return res.json({ message: "User Details", user: userObject, access_token });
        } catch (err) {
            console.error(err);
            return ApiresponeHandler.Error(res, err.message);
        }
    }
};

module.exports = loginController;
