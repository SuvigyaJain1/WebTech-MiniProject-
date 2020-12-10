const mongoose = require('mongoose');
const User = require('./User');
//const { ObjectId } = mongoose.Schema.Types;
var timestamps = require('mongoose-timestamp');
const postSchema= mongoose.Schema({
    caption:{type: String, maxlength: 100},
    content:{type: String, maxlength: 1000},
   // timestamps: true,
    author:{type:mongoose.Schema.Types.ObjectId, ref: "User", required: true}

});
postSchema.plugin(timestamps);
const Post = mongoose.model("Post", postSchema);
module.exports = { Post };