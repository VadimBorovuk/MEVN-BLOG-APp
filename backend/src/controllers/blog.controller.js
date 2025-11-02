import BlogModel from "../models/blog.model.js";
import cloudinary from "../lib/cloudinary.js";
import {getReceiverSocketId, io} from "../lib/socket.js";

export const getBlogs = async (req, res) => {
  try {
    const { title, tag, page = 1, limit = 10 } = req.query;

    const filter = {};

    if (title) {
      filter.title = { $regex: title, $options: "i" };
    }

    if (tag) {
      filter.tag = { $regex: tag, $options: "i" };
    }

    // 🔹 Пагінація
    const skip = (Number(page) - 1) * Number(limit);

    // 🔹 Отримуємо загальну кількість документів для фронтенду
    const total = await BlogModel.countDocuments(filter);

    // 🔹 Основний запит
    const blogs = await BlogModel
        .find(filter)
        .populate("userId", "fullName profilePic")
        .populate("comments.userId", "fullName profilePic")
        .populate("comments.likes.userId", "fullName profilePic")
        .populate("likes.userId", "fullName profilePic")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(Number(limit));

    // 🔹 Відповідь із метаданими для фронтенду
    return res.status(200).json({
      data: blogs,
      pagination: {
        total,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getPersonalBlogs = async (req, res) => {
  try {
    const { userId, page = 1, limit = 10 } = req.query;

    const filter = {};

    if (userId) {
      filter.userId = userId;
    }

    const skip = (Number(page) - 1) * Number(limit);

    // 🔹 Отримуємо загальну кількість документів для фронтенду
    const total = await BlogModel.countDocuments(filter);

    // 🔹 Основний запит
    const blogs = await BlogModel
        .find(filter)
        .populate("userId", "fullName profilePic")
        .populate("comments.userId", "fullName profilePic")
        .populate("comments.likes.userId", "fullName profilePic")
        .populate("likes.userId", "fullName profilePic")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(Number(limit));

    // 🔹 Відповідь із метаданими для фронтенду
    return res.status(200).json({
      data: blogs,
      pagination: {
        total,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Internal server error" });
  }
};



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
    findBlog.comments.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    return res.status(200).json(findBlog)
  } catch (e) {
    res.status(500).json({error: "Internal server error"});
  }
}

export const createBlog = async (req, res) => {
  try {
    const {title, content, previewImage, tag} = req.body;
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
      tag,
      previewImage: uploadedImage,
    })
    const populatedBlog = await blog.populate("userId", "fullName profilePic");

    const receiverSocketId = getReceiverSocketId(userId);
    const userSocket = io.sockets.sockets.get(receiverSocketId);

    const payload = JSON.stringify(populatedBlog)

    if (userSocket) {
      userSocket.broadcast.emit("newBlog", payload);
    } else {
      io.emit("newBlog", payload);
    }

    return res.status(201).json(blog)
  } catch (e) {
    console.log(e)
    res.status(500).json({error: "Internal server error"});
  }
}

export const updateBlog = async (req, res) => {
  try {
    const {title, content, tag, previewImage} = req.body;
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
    blog.tag = tag;

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
