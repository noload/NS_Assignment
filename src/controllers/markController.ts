import { Request, Response } from "express";
import Student from "../models/Student";
import Mark from "../models/Mark";

const createMark = async (req: Request, res: Response): Promise<any> => {
  try {
    const { studentId, subject, mark } = req.body;
    const marks = await Mark.create({ studentId, subject, mark });
    return res
      .status(201)
      .json({ msg: "Marks created successfully", data: marks });
  } catch (error) {
    console.log("Error while creating Marks");
    throw new Error("failed to create Marks");
  }
};

const getMarkByStudentId = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { id } = req.params;

    const marks = await Mark.findAll({ where: { studentId: id } });

    if (!marks) {
      return res.status(404).json({ msg: "Marks not found" });
    }

    return res.status(200).json({
      msg: "Marks  details fetched successfully",
      data: marks,
    });
  } catch (error) {
    console.log("Error", error);
  }
};

const deleteMark = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ msg: "Mark id is required" });
    }

    const mark = await Mark.findByPk(id);

    if (!mark) {
      return res.status(404).json({
        msg: "Mark already deleted",
      });
    }

    await mark.destroy();
    return res.status(200).json({ msg: "Mark deleted successfully" });
  } catch (error) {
    console.log("Error", error);
  }
};

export default { createMark, getMarkByStudentId, deleteMark };
