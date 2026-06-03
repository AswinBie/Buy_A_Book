const jwt = require("jsonwebtoken");
const { CreateError } = require('../utils/error');
const { CreateSuccess } = require("../utils/success");

exports.verifyToken = async (req, res, next) => {
    const token =  req.cookies.access_token;
    if( !token )
        return next(CreateError(401,"User not authenticated"));
    jwt.verify( token, process.env.JWT_TOKEN, (err,user) => {
        if(err){
            return next(CreateError(403,"Token Expired"));
        }else{
            req.user = user
        }
        next();
    })
}

exports.verifyUser = async (req,res,next) => {
    this.verifyToken (req, res, () => {
        if(req.user.id === req.params.id  || req.user.isAdmin ){
            next();
        }else {
            return next(CreateError(401, "User not authorised"))
        }
    })
}

exports.verifyAdmin = async (req,res,next) => {
    this.verifyToken (req, res, () => {
        if( req.user.isAdmin ){
            next();
        }else {
            return next(CreateError(401, "User not authorised"))
        }
    })
}