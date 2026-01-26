import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { userModel } from "../models/User.js";
const JWT_SECRET = process.env.JWT_SECRET || "abcde fg";

export const userSignUp = async function (req, res) {
  const { firstName, lastName, email, password, phone, location } = req.body;

  const hashPass = await bcrypt.hash(password, 5);

  try {
    console.log("Running sign up");
    console.log(hashPass);
    await userModel.create({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: hashPass,
      phone: phone,
      location: location,
    });
    console.log("Sign up successful");
  } catch (error) {
    res.status(404).json({
      message: "Unable to create entry" + error,
    });
  }

  res.json({
    message: "Sign up successfull",
  });
};

export const UserSignIn = async function (req, res) {
  const { email, password } = req.body;

  const x = await userModel.findOne({
    email: email,
  });
  if (!x) {
    res.json({
      message: "No entry present in database",
    });
    return;
  }
  console.log(x);
  const y = await bcrypt.compare(password, x.password);
  console.log(
    `User entered password: ${await bcrypt.hash(password, 5)}, ${x.password}`
  );

  if (y) {
    console.log("id:" + x._id);
    const token = jwt.sign(
      {
        id: x._id,
      },
      "abcdefg"
    );
    res
      .cookie("token", token, { httpOnly: true })
      .set("Access-Control-Allow-Credentials", "true")
      .status(200)
      .json({
        success: true,
        message: "Login successful",
        token: token,
      });

    return;
  } else {
    res.status(403).json({
      message: "Invalid credentials",
    });
  }
};

export const getUserProfile = async function (req, res) {
  try {
    let token = req.cookies.token;
    if (!token) {
      const authHeader = req.headers.authorization;
      if (authHeader && authHeader.startsWith("Bearer ")) {
        token = authHeader.substring(7);
      }
    }
    console.log("TOKEN: " + token);
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const decoded = jwt.verify(token, "abcdefg");
    const userId = decoded.id;
    console.log("decoded token: " + JSON.stringify(decoded));
    const user = await userModel.findById(userId).select("-password");

    if (decoded) {
      return res.status(200).json({ message: "valid token", user });
    }
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    console.log(decoded);
    res.json({ success: true, user });
  } catch (error) {
    res
      .status(401)
      .json({ message: "Invalid token", error, cookies: req.cookies });
  }
};

export const userLogout = async function (req, res) {
  try {
    res
      .clearCookie("token")
      .set("Access-Control-Allow-Credentials", "true")
      .status(200)
      .json({
        success: true,
        message: "Logout successful",
      });
  } catch (error) {
    res.status(500).json({ message: "Logout failed" });
  }
};

