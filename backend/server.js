require("dotenv").config();
require("./database")();

const express = require("express");
const app = express();
const cookie_parser = require("cookie-parser");
const cors = require("cors");
const PORT = process.env.BACKEND_PORT || 8000;

app.use(cors());
app.use(express.json());
app.use(cookie_parser());

app.get("/", (req, res) => {
  res.status(200).send("<h1>This end points is working. Cool, Happy Learning !! </h1>");
});

app.use("/user", require("./Routes/userRouter"));
app.use("/product", require("./Routes/productRouter"));
app.use("/category", require("./Routes/categoryRouter"));

app.listen(PORT, () => {
  console.log(`server listening at  http://localhost:${PORT}`);
});
