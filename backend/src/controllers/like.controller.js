import BlogModel from "../models/blog.model.js";

export const likeBlog = async (req, res) => {
  try {
    const {blogId} = req.params;
    const userId = req.user._id;

    const blog = await BlogModel.findById(blogId);
    if (!blog) return res.status(404).json({ message: "Блог не знайдено" });

    const alreadyLiked = blog.likes.some(like => like.userId.equals(userId));

    if (alreadyLiked) {
      blog.likes = blog.likes.filter(like => !like.userId.equals(userId));
    } else {
      blog.likes.push({ userId });
    }
    await blog.save();
    res.json(blog);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
}

export const likeComment = async (req, res) => {
  try {
    const {blogId} = req.params;
    const userId = req.user._id;

    const blog = await BlogModel.findById(blogId);
    if (!blog) return res.status(404).json({ message: "Блог не знайдено" });

    const comment = blog.comments.id(req.params.commentId);
    if (!comment) return res.status(404).json({ message: "Коментар не знайдено" });

    const alreadyLiked = comment.likes.some(like => like.userId.equals(userId));

    if (alreadyLiked) {
      comment.likes = comment.likes.filter(like => !like.userId.equals(userId));
    } else {
      comment.likes.push({ userId });
    }

    await blog.save();
    res.json(blog);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// import BlogModel from "../models/blog.model.js";
// import LikeModel from "../models/like.model.js";
//
// export const addLike = async (req, res) => {
//   try {
//     const {blogId} = req.params;
//     const userId = req.user._id;
//
//     const existing = await LikeModel.findOne({ blogId, userId });
//     if (existing) {
//       return res.status(400).json({ message: "Liked" });
//     }
//     const like = await LikeModel.create({blogId, userId});
//     await BlogModel.findByIdAndUpdate(blogId, {$inc: {likesCount: 1}});
//
//     res.status(201).json(like);
//   } catch (e) {
//     res.status(500).json({error: "Internal server error"});
//   }
// }
//
// export const removeLike = async (req, res) => {
//   try {
//     const {blogId} = req.params;
//     const userId = req.user._id;
//
//     const deleted = await LikeModel.findOneAndDelete({ blogId, userId });
//     if (!deleted) {
//       return res.status(404).json({ message: "Like not found" });
//     }
//
//     await BlogModel.findByIdAndUpdate(blogId, {$inc: {likesCount: -1}});
//
//     res.status(201).json({ message: "Dislike" });
//   } catch (e) {
//     res.status(500).json({error: "Internal server error"});
//   }
// }
//
// export const getLikes = async (req, res) => {
//   try {
//     const { blogId } = req.params;
//     const likes = await LikeModel.find({ blogId }).populate("userId", "fullName");
//     res.json(likes);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };



