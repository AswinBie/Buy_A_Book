const role = require("../models/role");
const user = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const { CreateError } = require("../utils/error");
const { CreateSuccess } = require("../utils/success");
const userToken = require("../models/userToken");

exports.register = async (req, res, next) => {
    try {
        const userRole = await role.find({ role: 'User'});
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.password, salt)
        const newUser = new user({
            firstname: req.body.firstName,
            lastname: req.body.lastName,
            username: req.body.userName,
            email: req.body.email,
            password: hashPassword,
            role: userRole,
        });
        
        await newUser.save();
        return next(CreateSuccess(200,"User Registered Successfully!"));
    } catch (error) {
        console.error('Error registering user:', error);
        return next(CreateError(500, "Internal Server Error"));
    }
}

exports.registerAdmin = async (req, res, next) => {
    try {
        const userRole = await role.find({});
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.password, salt)
        const newUser = new user({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            username: req.body.username,
            email: req.body.email,
            password: hashPassword,
            isAdmin: true,
            role: userRole,
        });
        
        await newUser.save();
        return next(CreateSuccess(200,"Admin Registered Successfully!"));
    } catch (error) {
        console.error('Error registering user:', error);
        return next(CreateError(500, "Internal Server Error"));
    }
}

exports.login = async (req, res, next) => {
    try {
        const currentUser = await user.findOne({email: req.body.email})
        .populate('role','role');

        if(!currentUser) {
            return next(CreateError(404, 'User not found!'))
        }
        const { roles } = currentUser ;
        const isPasswordCorrect =  await bcrypt.compare(req.body.password, currentUser.password);
        if(!isPasswordCorrect) {
            return next(CreateError(404, 'Incorrect password!'))
        }
        const token = jwt.sign(
            {id: currentUser._id, isAdmin: currentUser.isAdmin, roles: roles},
            process.env.JWT_TOKEN
        )
        // return next(CreateSuccess(200,"Login Successfull!"));
        res.cookie('access_token',token,{httponly:true})
        .status(200)
        .json({
            status: 200,
            message: 'Login Success',
            data: currentUser
        })
    } catch (error) {
        return next(CreateError(500, "Internal Server Error"));
    }
}

exports.sendEmail = async(req, res, next) => {
    const email = req.body.email;
    const foundUser = await user.findOne({email:{ $regex: '^'+email+'$', $options:'i'}});
    if(!foundUser){
    return next(CreateError(404, 'User not found')); 
    }
    const payload = {
        email: foundUser.email
    }
    const expiryTime = 300;
    const token = jwt.sign( payload, process.env.JWT_TOKEN, {expiresIn:expiryTime});

    const newToken = new userToken({
        userId: foundUser._id,
        token: token
    });

    const mailTransporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "ash9600govind@gmail.com",
            pass: "vtmo wckb waey qzvk"
        }
    });

    let mailDetails = {
        from: "ash9600govind@gmail.com",
        to: email,
        subject: "Reset Password",
        html:`
        <html>
            <head>
                <title>Password Reset Request</title>
            </head>
            <body>
                <h1>Password Reset Request</h1>
                <p>Dear ${foundUser.username},</p>
                <p>We have received a request to reset your password for your account with Buy-A-Book. To complete the password reset process, please click on the button below:</p>
                <a href="${process.env.LIVE_URL}/reset/${token}" style="background-color: #4CAF50; color: white; padding: 14px 20px; text-decoration: none; display: inline-block; border-radius: 4px;">Reset Password</a>
                <p>Please note that this link is only valid for 5 mins. If you did not request a password reset, please disregard this message.</p>
                <p>Thank you,</p>
                <p>Buy-A-Book Team</p>
            </body>
        </html>
        `
    };
    mailTransporter.sendMail(mailDetails, async(err, data) => {
        if(err){
            console.log(err);
            return next(CreateError(500, "Something went wrong while sending the email"))
        }else{
            await newToken.save();
            return next(CreateSuccess(200, "Email Sent Succesfully"))
        }
    })
}