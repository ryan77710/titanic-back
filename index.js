import "dotenv/config";
import express from "express";
import formidable from "express-formidable";
import mongoose from "mongoose";
import cors from "cors";

const app = express();
app.use(formidable());
app.use(cors());

mongoose
  .connect("mongodb://localhost/titanic", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("database connected"))
  .catch((e) => console.log(e));

const port = 3500;

app.get("/", (req, res) => {
  res.send("hiiiii");
});

app.listen(port, () => {
  console.log(`server started at port  ${port}`);
});
