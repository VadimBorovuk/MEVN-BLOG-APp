import BlogModel from "../models/blog.model.js";
import cloudinary from "../lib/cloudinary.js";

export const getBlogs = async (req, res) => {
  try {
    const blogs = await BlogModel
        .find()
        .populate("userId", "fullName profilePic")
        .populate("comments.userId", "fullName profilePic")
        .populate("comments.likes.userId", "fullName profilePic")
        .populate("likes.userId", "fullName profilePic")
        .sort({createdAt: -1});
    return res.status(200).json(blogs)
  } catch (e) {
    res.status(500).json({error: "Internal server error"});
  }
}

export const getBlogsById = async (req, res) => {
  try {
    const {blogId} = req.params;

    const findBlog = await BlogModel
        .findById(blogId)
        .populate("userId", "fullName profilePic")
        .populate("comments.userId", "fullName profilePic")
        .populate("comments.likes.userId", "fullName profilePic")
        .populate("likes.userId", "fullName profilePic")

    if (!findBlog) {
      return res.status(404).json({message: "Блог не знайдено"});
    }

    return res.status(200).json(findBlog)
  } catch (e) {
    res.status(500).json({error: "Internal server error"});
  }
}

export const createBlog = async (req, res) => {
  try {
    const {title, content, previewImage} = req.body;
    const userId = req.user._id;

    if (!title || title.trim().length < 3) {
      return res.status(400).json({message: "Title is required and must be at least 3 characters"});
    }

    let uploadedImage = null;
    if (previewImage) {
      const uploadResponse = await cloudinary.uploader.upload(previewImage, {
        folder: "blogs",
      });
      uploadedImage = uploadResponse.secure_url;
    }
    const blog = await BlogModel.create({
      title,
      content,
      userId,
      previewImage: uploadedImage,
    })

    return res.status(201).json(blog)
  } catch (e) {
    console.log(e)
    res.status(500).json({error: "Internal server error"});
  }
}

export const updateBlog = async (req, res) => {
  try {
    const {title, content, previewImage} = req.body;
    const blogId = req.params.id;
    const userId = req.user._id;

    if (!title || title.trim().length < 3) {
      return res.status(400).json({message: "Title is required and must be at least 3 characters"});
    }

    const blog = await BlogModel.findById(blogId);
    if (!blog) return res.status(404).json({message: "Блог не знайдено"});

    // Перевірка прав доступу
    if (String(blog.userId) !== String(userId)) {
      return res.status(403).json({message: "Ви не можете редагувати чужий блог"});
    }

    // Якщо прийшла нова картинка
    if (previewImage) {
      const uploadResponse = await cloudinary.uploader.upload(previewImage, {
        folder: "app-blog__blogs",
      });
      blog.previewImage = uploadResponse.secure_url;
    }

    blog.title = title;
    blog.content = content;

    const updatedBlog = await blog.save();
    return res.status(200).json(updatedBlog);
  } catch (e) {
    console.log(e)
    res.status(500).json({error: "Internal server error"});
  }
}


export const deleteBlog = async (req, res) => {
  try {
    const blogId = req.params.id;
    const blog = await BlogModel.findById(blogId);
    const userId = req.user._id;

    if (!blog) return res.status(404).json({message: "Блог не знайдено"});

    // Перевірка прав доступу
    if (String(blog.userId) !== String(userId)) {
      return res.status(403).json({message: "Ви не можете видаляти чужий блог"});
    }

    await blog.deleteOne();

    return res.status(200).json({message: "Блог видалено"});
  } catch (e) {
    console.log(e)
    res.status(500).json({error: "Internal server error"});
  }
}
