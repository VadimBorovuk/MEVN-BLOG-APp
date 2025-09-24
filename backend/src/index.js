import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
dotenv.config();

import blogRoutes from "../routes/blog.routes.js";

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

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "../frontend/dist")));
//
//   app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
//   });
// }

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "../frontend/dist")));
// }

if (process.env.NODE_ENV === "production") {
  // Сервіруємо статичні файли з папки frontend/dist
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  // Цей маршрут буде обробляти ВСІ GET-запити, які не були оброблені вище
  // (тобто не /api/blogs). Це дозволить вашому односторінковому додатку
  // працювати коректно, адже Vue.js буде відповідати за маршрутизацію
  // на стороні клієнта.
  app.use((req, res, next) => {
    // Якщо запит не до API, віддаємо файл index.html
    if (!req.path.startsWith('/api')) {
      res.sendFile(path.join(__dirname, '../frontend/dist', 'index.html'));
    } else {
      next(); // Продовжуємо, якщо запит до API
    }
  });
}

app.listen(PORT,()=>{
  console.log(`PORT listen on http://localhost:${PORT}`)
})
