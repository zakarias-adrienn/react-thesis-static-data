import { Teacher, teacherSchema } from "../model/teachers.model";

const Joi = require("joi");

// teacherApi.get(id)
export type getTeacherByIdAction = {
  type: "get-teacher";
  payload: {
    teacherId: string;
  };
  response: {
    teacher: Teacher;
  };
};

export const getTeacherByIdActionSchema = {
  type: "get-teacher",
  payload: {
    teacherId: Joi.string().required()
  },
  response: {
    teacher: teacherSchema
  }
};
