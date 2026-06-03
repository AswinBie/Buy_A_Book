const mongoose  = require('mongoose');

const TokenSchema = mongoose.Schema(
    {
        userId: {
            type: [mongoose.Schema.Types.ObjectId],
            required: true,
            ref:"User"
        },
        token: {
            type: String,
            requried: true,
        },
        createdAt:{
            type: Date,
            default: Date.now,
            expires: 300
        }
    }
)

module.exports = mongoose.model("Token",TokenSchema);