const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    gameId: { type: Number, required: true },
    replyId: { type: mongoose.Schema.Types.ObjectId, ref: "Comment", default: null },
    commentText: { type: String, required: true },
    commentDateTime: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Comment", commentSchema);
