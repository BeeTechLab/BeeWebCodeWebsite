const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    student_name: String,
    fathers_name: String,
    phone_number: String,
    qualification: String,
    email: {
    type: String,
    required: true
}
});

module.exports = mongoose.model('User', userSchema);