import { Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcryptjs";

const createUser = async (req: Request, res: Response) => {
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
