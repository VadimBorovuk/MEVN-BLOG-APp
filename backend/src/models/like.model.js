import mongoose from "mongoose";

export const likeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    createdAt: { type: Date, default: Date.now }
  },
})

// old version
// const likeSchema = new mongoose.Schema(
//     {
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
// likeSchema.index({ blogId: 1, userId: 1 }, { unique: true });
//
// const Like = mongoose.model("Like", likeSchema);
//
// export default Like;
