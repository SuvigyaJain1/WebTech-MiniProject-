const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;


const groupSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 100
    },
    createdBy: {
        type: ObjectId,
        ref: "User"
    },
    members: [],
    admins: [],
    posts: [{
        type: ObjectId,
        ref: "Post"
    }]//Array of posts referring to posts
});

const Group = mongoose.model("Group", groupSchema);
module.exports = { Group };
