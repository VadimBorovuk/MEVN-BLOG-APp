export const getBlogs = async (req, res) => {
  try {
    const blogs = [{id: 1, title: "Hello", text: "world"}]
    return res.status(200).json(blogs)
  } catch (e) {
    res.status(500).json({error: "Internal server error"});
  }
}
