import BlogModel from "../models/blog.model.js";

export const addComment = async (req, res) => {
  try {
    const {blogId} = req.params;
    const blog = await BlogModel.findById(blogId);
    if (!blog) return res.status(404).json({ message: "Блог не знайдено" });

    blog.comments.push({
      content: req.body.content,
      userId: req.user._id
    });

    await blog.save();
    res.status(201).json(blog);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


export const updateComment = async (req, res) => {
  try {
    const {content} = req.body;
    const {blogId, commentId} = req.params;
    const blog = await BlogModel.findById(blogId);
    if (!blog) return res.status(404).json({ message: "Блог не знайдено" });

    let currentComment = blog.comments.id(commentId)
    if (!currentComment) {
      return res.status(404).json({ message: "Comment не знайдено" });
    }

    // Перевірка, що оновлює автор коментаря (опціонально)
    if (String(currentComment.userId) !== String(req.user._id)) {
      return res.status(403).json({ message: "Немає доступу до редагування цього коментаря" });
    }

    currentComment.content = content;

    await blog.save();
    res.status(200).json({ message: "Коментар оновлено", currentComment });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const removeComment = async (req, res) => {
  try {
    const {blogId, commentId} = req.params;
    const blog = await BlogModel.findById(blogId);
    if (!blog) return res.status(404).json({ message: "Блог не знайдено" });

    let currentComment = blog.comments.id(commentId)
    if (!currentComment) {
      return res.status(404).json({ message: "Comment не знайдено" });
    }

    // Перевірка, що видаляє автор (опціонально: або адмін)
    if (String(currentComment.userId) !== String(req.user._id)) {
      return res.status(403).json({ message: "Немає доступу до видалення цього коментаря" });
    }

    currentComment.deleteOne();

    await blog.save();
    res.status(200).json({ message: "Коментар видалено", currentComment });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};



// import BlogModel from "../models/blog.model.js";
// import CommentModel from "../models/comment.model.js";
//
// export const getCommentsByCurrentBlog = async (req, res) => {
//   try {
//     const blogId = req.params.blogId;
//
//     const {page = 1, limit = 10} = req.query;
//     const comments = await CommentModel.find({blogId})
//         .populate("userId", "fullName")
//         .sort({createdAt: -1})
//         .skip((page - 1) * limit)
//         .limit(parseInt(limit));
//
//     const total = await CommentModel.countDocuments({blogId});
//
//     res.json({comments, total, page: parseInt(page), pages: Math.ceil(total / limit)});
//   } catch (e) {
//     res.status(500).json({error: "Internal server error"});
//   }
// }
//
// export const createComment = async (req, res) => {
//   try {
//     const userId = req.user._id;
//     const blogId = req.params.blogId;
//
//     const {content} = req.body;
//     if (!content) return res.status(400).json({message: "Content field are required"})
//
//     const comment = await CommentModel.create({
//       content,
//       userId,
//       blogId
//     })
//     await BlogModel.findByIdAndUpdate(blogId, {$inc: {commentsCount: 1}});
//
//     return res.status(201).json(comment)
//   } catch (e) {
//     console.log(e)
//     res.status(500).json({error: "Internal server error"});
//   }
// }
//
// export const updateComment = async (req, res) => {
//   try {
//     const {content} = req.body;
//     const {blogId, id} = req.params;
//     const userId = req.user._id;
//
//     if (!content) return res.status(400).json({message: "Content field are required"})
//
//     const updatedBlog = await CommentModel.findByIdAndUpdate(
//         id,
//         {
//           content,
//           userId,
//           blogId
//         },
//         {new: true})
//
//     return res.status(200).json(updatedBlog)
//   } catch (e) {
//     console.log(e)
//     res.status(500).json({error: "Internal server error"});
//   }
// }
//
//
// export const deleteComment = async (req, res) => {
//   try {
//     const {blogId, id} = req.params;
//     const currentBlog = await BlogModel.findById(blogId);
//     const deleteComment = await CommentModel.findByIdAndDelete(id)
//
//     if (!deleteComment) return res.status(400).json({message: 'Comment not founded'})
//
//     if (currentBlog.commentsCount > 0) {
//       await BlogModel.findByIdAndUpdate(blogId, {$inc: {commentsCount: -1}});
//     }
//     return res.status(200).json({message: 'Comment deleted success'})
//   } catch (e) {
//     console.log(e)
//     res.status(500).json({error: "Internal server error"});
//   }
// }


// comments
