'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ActivitySchema = new Schema({
	created_at: {
		type: Date,
		default: Date.now
	},
	updated_at: {
		type: Date,
    default: Date.now
	},
  frame: {
    type: Schema.ObjectId,
    ref: 'Frame'
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  type: {
    type: String,
    default: 'chat'
  },
  data: {
    message: {
      type: String
    },
    users: [{
      type: Schema.ObjectId,
      ref: 'User'
    }]
  }
});

ActivitySchema.pre('update', function (next) {

	var now = new Date();
	this.updated_at = now;
	next();
});

module.exports = mongoose.model('Activity', ActivitySchema);
