import express from "express";
import User from "../model/User.js";
import uid2 from "uid2";
import SHA256 from "crypto-js/sha256.js";
import encBase64 from "crypto-js/enc-base64.js";

const router = express.Router();

router.get("/signup", async (req, res) => {
  console.log("route: /signup");
  try {
    if (req.fields.email) {
      const find = await User.findOne({ email: req.fields.email });
      if (find) {
        res.status(400).json({ message: "email already use" });
      } else {
        const newAccount = new User({
          email: req.fields.email,
        });
        const token = uid2(64);
        const salt = uid2(64);
        const hash = SHA256(req.fields.password + salt).toString(encBase64);

        newAccount.token = token;
        newAccount.hash = hash;
        newAccount.salt = salt;
        await newAccount.save();
        res.status(200).json(newAccount);
      }
    } else {
      res.status(400).json({ message: "missing field" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/login", async (req, res) => {
  console.log("route: /login");
  try {
    const find = await User.findOne({ email: req.fields.email });
    const password = req.fields.password;
    const userSalt = find.salt;
    const hashToCompare = SHA256(password + userSalt).toString(encBase64);

    if (find.hash === hashToCompare) {
      const back = {
        id: find.id,
        token: find.token,
      };
      res.status(200).json(back);
    } else {
      res.status(400).json({ message: "bad password" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
export default router;
