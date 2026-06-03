const user = require("../models/user");
const { CreateError } = require("../utils/error");
const { CreateSuccess } = require("../utils/success");

exports.getAllUsers = async( req, res, next) => {
    try {
        const users =  await user.find();
        return next(CreateSuccess(200, "All Users", users))        
    } catch (error) {
        return next(CreateError(500, "Internal server Error"))
    }
}

exports.getUserById = async( req, res, next) => {
    try {
        const singleUser = await user.findById(req.params.id);
        if(!singleUser) 
            return next(CreateError(404, "User not found"));
        return next(CreateSuccess(200, "User Details", singleUser));
    } catch (error) {
        return next(CreateError(500, "Internal server Error"))
    }
}