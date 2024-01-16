const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { DateTime } = require('luxon');

// Messages that can be posted by users
const MessageSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now() },
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

// MessageSchema.virtual('url').get(function () {
//   return `/messages/${this._id}`;
// });

// Creates a formatted timestamp to display in the front end
MessageSchema.virtual('timestamp_formatted').get(function () {
  return DateTime.fromJSDate(this.timestamp).toLocaleString(DateTime.DATE_MED);
  // return DateTime.fromJSDate(this.timestamp).toISODate();
});

module.exports = mongoose.model('Message', MessageSchema);
