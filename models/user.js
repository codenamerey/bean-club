const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    first_name: { type:String, required: true },
    last_name: { type: String, required: true },
    display_name: { type: String, default: 'Anonymous', required: true },
    email_address: { type: String, required: true },
    joined_date: { type: Date, required: true },
    display_picture: { type: String, required: true }
});

UserSchema.virtual('name').get(function() {
    return `${this.first_name} ${this.last_name}`;
});

module.exports = mongoose.model('User', UserSchema);