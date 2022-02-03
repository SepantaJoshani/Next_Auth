import connectDB from "../../lib/connectDB";
import User from "../../lib/model/userModel";
import { hash } from "bcryptjs";

connectDB();
const handler = async (req, res) => {
  try {
    if (req.method === "POST") {
      const { email, password } = req.body;

      const existingUser = await User.findOne({ email: email });

      if (existingUser) {
        res.status(422).json({ message: "User already exists" });

        return;
      }

      const hashedPassword = await hash(password, 12);

      const newUser = await new User({
        email,
        password: hashedPassword,
      }).save();
      res.status(200).json({ message: "Sign up succeed" });
    }
  } catch (error) {
    console.log(error);
    res.status(422).json({ message: "Invalid mail type " });
  }
};

export default handler;
