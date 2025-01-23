import { Request, Response } from "express";
import Student from "../models/Student";
import Mark from "../models/Mark";

const createStudent = async (req: Request, res: Response): Promise<any> => {
  try {
    const { name, age } = req.body;
    const student = await Student.create({ name, age });
    return res
      .status(201)
      .json({ msg: "Student created successfully", data: student });
  } catch (error) {
    console.log("Error while creating student",error);
    throw new Error("failed to create Student");
  }
};

const getStudentById = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;

    const student = await Student.findByPk(id, { include: Mark });

    if (!student) {
      return res.status(404).json({ msg: "Student not found" });
    }

    return res.status(200).json({
      msg: "Student details fetched successfully",
      data: student,
    });
  } catch (error) {
    console.log("Error", error);
  }
};

const getAllStudent = async (req: Request, res: Response): Promise<any> => {
  try {
    const { page, limit } = req.query;
    const Page = Number(page) | 1;
    const Limit = Number(limit) | 10;
    const offset = (Page - 1) * Limit;

    const { rows, count } = await Student.findAndCountAll({
      include: [{ model: Mark}],
      limit: Limit,
      offset,
    });

    if (count < 1) {
      return res.status(404).json({ msg: "Student not found" });
    }

    return res.status(200).json({
      msg: "Student data fetched successfully",
      data: rows,
      pagination: {
        curentPage: Page,
        totalPages: Math.floor(count / Limit),
        limit: Limit,
        totalItems: count,
      },
    });
  } catch (error) {
    console.log("Error", error);
  }
};

const updateStudent = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;
    const { name, age } = req.body;
    if (!id) {
      return res.status(400).json({ msg: "Student id is required" });
    }

    const student = await Student.findByPk(id);

    if (!student) {
      return res.status(404).json({
        msg: "Stuent not found",
      });
    }

    await student.update({ name, age });

    return res.status(200).json({ msg: "Student updated successfully" });
  } catch (error) {
    console.log("Error", error);
  }
};

const deleteStudent = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ msg: "Student id is required" });
    }

    const student = await Student.findByPk(id);

    if (!student) {
      return res.status(404).json({
        msg: "Stuent already deleted",
      });
    }

    await student.destroy();
    return res.status(200).json({ msg: "Student deleted successfully" });
  } catch (error) {
    console.log("Error", error);
  }
};


export default {createStudent,deleteStudent,updateStudent,getAllStudent,getStudentById}