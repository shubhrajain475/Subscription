import bcrypt from "bcrypt";

import { User } from "../models/user.js";

export const signup = async (req, res, next) => {
  try {
    const { username, email, contactNo, password, confirmPassword } = req.body;
    console.log(username, email, contactNo, password, confirmPassword);
    let user = await User.findOne({ email });
    if (user) {
      return res.status(404).send({
        message: "User already exist",
        success: false,
      });
    }
    user = await User.create({
      username,
      email,
      contactNo,
      password,
      confirmPassword,
    });
    return res.status(200).send({
      message: "Registration Successful",
      success: true,
    });
  } catch (error) {
    return res.status(500).send({
      message: `Internal server error: ${error}`,
      success: false,
    });
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(404).send({
        message: "User not found:${error}",
        success: "true",
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        message: "Your email or password is wrong",
        success: false,
      });
    }
    user.password = "";
    return res.status(200).json({
      message: "Login Successfully",
      success: true,
    });
  } catch (err) {
    console.log("Error", err);
    return res.status(501).json({
      success: "false",
      message: "Internal Server",
    });
  }
};

export const getAll = async (req, res) => {
  try {
    console.log(req.query);
    const get = await User.find(req.query);

    res.status(200).json({
      status: "success",
      length: get.length,
      data: {
        get,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};

export const getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ messsage: "Internal server error" });
  }
};
