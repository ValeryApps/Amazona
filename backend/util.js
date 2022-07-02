import jwt from "jsonwebtoken";
export const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      email:user.email,
      name: user.name,
      isAdmin: user.isAdmin,
    },
    process.env.USER_SECRET,
    {
      expiresIn: "1d",
    }
  );
};
