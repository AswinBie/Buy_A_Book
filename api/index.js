const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const roleRouter = require("./routes/roleRouter");
const authRouter = require("./routes/authRouter");
const userRouter = require("./routes/userRouter");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();
dotenv.config();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:'http://localhost:4200',
    credentials: true
}))
app.use('/api/role', roleRouter);
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);

// Response handler middleware
app.use((obj,req,res,next) => {
    const statusCode = obj.status || 500;
    const message = obj.message || "Internal server error";
    return res.status(statusCode).json({
        success: [200,201,204].some(a => a === obj.status)  ? true : false,
        status: statusCode,
        message: message,
        data: obj.data
    });
})

// DB Connection
const connectMongooseDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log('Connected to DB');
    } catch (error) {
        throw error;
    }
}

app.listen(3000, () => {
    connectMongooseDB();
    console.log('listening to port 3000')
})