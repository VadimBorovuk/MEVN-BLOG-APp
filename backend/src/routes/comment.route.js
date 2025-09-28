// import express from "express";
// import {
//   createComment, deleteComment,
//   getCommentsByCurrentBlog, updateComment,
// } from "../controllers/comment.controller.js";
// import {protectRoute} from "../middlewares/auth.middleware.js";
//
// const router = express.Router();
//
// router.get("/:blogId", protectRoute, getCommentsByCurrentBlog);
// router.post("/:blogId/create", protectRoute, createComment);
// router.put("/:blogId/update/:id", protectRoute, updateComment);
// router.delete("/:blogId/delete/:id", protectRoute, deleteComment);
//
// export default router;
//
//
//
// // add likes
// // add socket.io for adding blog, comments, likes
