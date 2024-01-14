const mongoose = require('mongoose');
const Schema = mongoose.Schema();
const { DateTime } = require('luxon');

const UserSchema = new Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  membership_status: {
    type: String,
    required: true,
    enum: ['user', 'member', 'admin'],
    default: 'user',
  },
  created_at: { type: Date, default: Date.now() },
});

UserSchema.virtual('url').get(function () {
  return `/users/${this._id}`;
});

UserSchema.virtual('full_name').get(function () {
  return `${this.first_name} ${this.last_name}`;
});

UserSchema.virtual('created_at_formatted').get(function () {
  return DateTime.fromJSDate(this.created_at).toLocaleString(DateTime.DATE_MED);
});

module.exports = mongoose.model('User', UserInstanceSchema);
