import User from "../model/User.js";

const isLogin = async (req, res, next) => {
  console.log("test isLogin enter");

  if (req.headers.authorization) {
    const token = req.headers.authorization.replace("Bearer ", "");
    const user = await User.findOne({ token: token }).select("email");
    if (user) {
      req.user = user;
      console.log("test isAuthentificated finish :)");
      return next();
    } else {
      return res.status(400).json({ message: "unauthorized :(" });
    }
  } else {
    return res.status(400).json({ message: "unauthorized :(" });
  }
};
export default isLogin;
