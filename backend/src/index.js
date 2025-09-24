import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import blogRoutes from "../routes/blog.routes.js";
import path from "path";
dotenv.config();

const PORT = process.env.PORT || 3333;
const __dirname = path.resolve();
const app = express();

app.use(
    cors({
      origin: "http://localhost:5173",
      credentials: true,
    })
);

app.use('/api/blogs', blogRoutes)


if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

app.listen(PORT,()=>{
  console.log(`PORT listen on http://localhost:${PORT}`)
})
