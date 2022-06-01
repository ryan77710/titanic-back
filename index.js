import "dotenv/config";
import express from "express";
import formidable from "express-formidable";
import mongoose from "mongoose";
import cors from "cors";

import customerRoutes from "./route/customer.js";
import userRoutes from "./route/user.js";

const app = express();
app.use(formidable());
app.use(cors());

mongoose
  .connect(process.env.LOCALHOST, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("database connected"))
  .catch((e) => console.log(e));

app.use(customerRoutes);
app.use(userRoutes);

app.get("/", (req, res) => {
  res.send("hiiiii :)");
});

app.get("*", (req, res) => {
  res.status(404).send("page not found :(");
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`server started `);
});
