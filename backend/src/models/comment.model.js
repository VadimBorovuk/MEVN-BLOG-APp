import mongoose from "mongoose";
import {likeSchema} from "./like.model.js";

export const commentSchema = new mongoose.Schema({
  content: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  likes: [likeSchema], // масив лайків до коментаря
  createdAt: { type: Date, default: Date.now }
});

// old_version
// const commentSchema = new mongoose.Schema(
//     {
//       content: {
//         type: String,
//         required: true,
//       },
//       userId: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "User",
//         required: true,
//       },
//       blogId: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Blog",
//         required: true,
//       },
//     },
//     { timestamps: true }
// );
//
// const Comment = mongoose.model("Comment", commentSchema);
//
// export default Comment;
