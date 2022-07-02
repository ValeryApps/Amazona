import express from "express";
import expressAsyncHandler from "express-async-handler";
import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import { generateToken } from "../util.js";

export const userRouter = express.Router();

userRouter.post(
  "/signin",
  expressAsyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      if ( bcrypt.compareSync(password, user.password)) {
        return res.send({
          id: user._id,
          email: user.email,
          name: user.name,
          isAdmin: user.isAdmin,
          token:generateToken(user)
        });
      }
    }
    return res.status(401).json({ message: "Invalid email or password" });
  })
);


userRouter.post(
  "/register",
  expressAsyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    const newUser = new User({
      name,
      email,
      password:bcrypt.hashSync(password, 10)
    })
    const user = await newUser.save()
    if (user) {
      if (await bcrypt.compareSync(password, user.password)) {
        return res.send({
          id: user._id,
          email: user.email,
          name: user.name,
          isAdmin: user.isAdmin,
          token:generateToken(user)
        });
      }
    }
    return res.status(401).json({ message: "Invalid email or password" });
  })
);
