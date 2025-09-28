import mongoose from "mongoose";
import {commentSchema} from "./comment.model.js";
import {likeSchema} from "./like.model.js";


const blogSchema = new mongoose.Schema(
    {
      title: {
        type: String,
        required: true,
      },
      content: {
        type: String,
        default: ""
      },
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      previewImage: {
        type: String,
        default: "",
      },
      comments: [commentSchema],
      likes: [likeSchema]
    },
    { timestamps: true }
);

const Blog = mongoose.model("Blog", blogSchema);

export default Blog;
