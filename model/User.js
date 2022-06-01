import mongoose from "mongoose";

const User = mongoose.model("User", {
  email: String,
  token: String,
  hash: String,
  salt: String,
});

export default User;
