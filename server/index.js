const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5050;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Lili Store backend is running 🎉");
});

app.listen(PORT, () => {
console.log(`Server is running on port ${PORT}`)
});