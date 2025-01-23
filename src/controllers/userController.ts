import { Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcryptjs";
import { generateToken } from "../services/jwtService";

const createUser = async (req: Request, res: Response):Promise<any> => {
  try {
    const { name, email, password, role } = req.body;

    const userExist = await User.findOne({ where: { email } });
    if (userExist) {
      return res.status(400).json({ msg: "User already exist" });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashPassword,
      role,
    });

    return res
      .status(201)
      .json({ msg: "user created successfully", data: user });
  } catch (error: any) {
    console.log("Error while creating user", error);
    return res.status(500).json({ msg: (error as any).message });
  }
};

const login = async (req: Request, res: Response):Promise<any> => {
  try {
    const { email, password } = req.body;
    const userExist = await User.findOne({ where: email });

    if (!userExist) {
      return res.status(404).json({ msg: "User not found" });
    }

    const comparePassword = await bcrypt.compare(password, userExist.password);
    if (!comparePassword) {
      return res.status(400).json({
        msg: "Password is wrong.!! try again",
      });
    }

    const token = generateToken(userExist.id, userExist.email);

    return res.status(200).json({ msg: "Logged successfully", token });
  } catch (error) {
    console.log("eror while loggin in", error);
    return res.status(500).json({ msg: "failed to login" });
  }
};

export default {createUser,login}