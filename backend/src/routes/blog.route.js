import express from "express";
import {
  createBlog,
  deleteBlog,
  getBlogs, getBlogsById,
  updateBlog,
} from "../controllers/blog.controller.js";
import {protectRoute} from "../middlewares/auth.middleware.js";
import {addComment, removeComment, updateComment} from "../controllers/comment.controller.js";
import {likeBlog, likeComment} from "../controllers/like.controller.js";

const router = express.Router();

// blogs
router.get("/", protectRoute, getBlogs);
router.get("/:blogId", protectRoute, getBlogsById);
router.post("/create", protectRoute, createBlog);
router.put("/update/:id", protectRoute, updateBlog);
router.delete("/delete/:id", protectRoute, deleteBlog);
router.post("/:blogId/like", protectRoute, likeBlog);

// comments
router.post("/:blogId/comments/add", protectRoute, addComment);
router.put("/:blogId/comments/:commentId/update", protectRoute, updateComment);
router.delete("/:blogId/comments/:commentId/delete", protectRoute, removeComment);
router.post("/:blogId/comments/:commentId/like", protectRoute, likeComment);

export default router;
