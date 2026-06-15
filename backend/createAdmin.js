import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import Admin from "./models/Admin.js";
import dotenv from "dotenv";

dotenv.config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const hashedPassword = await bcrypt.hash("admin123", 10);

    const admin = new Admin({
      username: "admin",
      password: hashedPassword
    });

    await admin.save();

    console.log("✅ Admin created successfully");
    process.exit();
  } catch (error) {
    console.log("❌ Error:", error.message);
    process.exit(1);
  }
};
jwt.sign(payload, process.env.JWT_SECRET, {
  expiresIn: "1d"
});
createAdmin();