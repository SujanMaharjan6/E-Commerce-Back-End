var mongoose = require('mongoose');

var schema = mongoose.Schema;

var UserSchema = new schema({
    Name: {
        type: String,
        lowercase: true
    },
    Gender: {
        type: String,
        enum: ['male', 'female', 'others']
    },
    Address: {
        temp: [String],
        perm: String
    },
    Username: {
        type: String,
        unique: true,
        sparse: true
        // required: true
    },
    Password: {
        type: String,
        required: true
    },
    DoB: {
        type: Date
    },
    Role: {
        type: Number,
        default: 2
    },
    Status: {
        type: String,
        enum: ['Online', 'Offline'],
        default: 'Online'
    },
    Email: {
        type: String,
        sparse: true,
        unique: true
    },
    Image: String,
    passwordResetToken: String,
    passwordResetTokenExpiry: Date

}, {
    timestamps: true
})



const UserModel = mongoose.model('user', UserSchema);

module.exports = UserModel;