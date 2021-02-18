import { Student, studentSchema } from "../model/students.model";

const Joi = require("joi");

export type getStudentByIdAction = {
  type: "get-student";
  payload: {
    studentId: string;
  };
  response: {
    student: Student;
  };
};

export const getStudentByIdActionSchema = {
  type: "get-student",
  payload: {
    studentId: Joi.string().required()
  },
  response: {
    student: studentSchema
  }
};
