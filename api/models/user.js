const mongoose = require('mongoose');

const UserSchema = mongoose.Schema(
    {
        firstname:{
            type: String,
            required: true
        },
        lastname: {
            type:String,
            required: true
        },
        username: {
            type:String,
            required: true,
            unique: true
        },
        email: {
            type:String,
            required: true,
            unique: true
        },
        password: {
            type:String,
            required: true
        },
        profilePicture: {
            type:String,
            required: false,
            default:"https://www.pngarts.com/files/5/Cartoon-Avatar-PNG-Image-Transparent.png"
        },
        isAdmin: {
            type: Boolean,
            default: false
        },
        role: {
            type: [mongoose.Schema.Types.ObjectId],
            required: true,
            ref: "Role"
        }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model("User",UserSchema);