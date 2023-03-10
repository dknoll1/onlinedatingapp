const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    facebook: {
        type: String
    },
    google: {
        type: String
    },
    firstname: {
        type: String
    },
    lastname: {
        type: String
    },
    fullname: {
        type: String
    },
    image: {
        type: String,
        default: '/img/user.jpg'
    },
    email: {
        type: String
    },
    city: {
        type: String
    },
    country: {
        type: String
    },
    age: {
        type: String
    },
    gender: {
        type: String
    },
    about: {
        type: String,
        default: 'Seeking relationship...'
    },
    online: {
        type: Boolean,
        default: false
    },
    wallet: {
        type: Number,
        default: 0
    },
    password: {
        type: String
    }
});

module.exports = mongoose.model('User',userSchema);