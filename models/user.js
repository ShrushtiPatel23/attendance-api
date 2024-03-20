const mongoose = require('mongoose')
const { Schema } = mongoose;
const UserSchema = new Schema({
        email: {
            type: String,
            required: true
        },
        password: {
            type: String
        }

    },
        {
            freezeTableName: true,
            timestamps: false

        }
    );

const User = mongoose.model('user', UserSchema)
module.exports = User;    