const Joi = require("joi");

import { Teacher, teacherSchema } from "../model/teachers.model";

// dropdownokban kell megjelenítenem
export type getTeachersAction = {
  type: "get-teachers";
  payload: {};
  response: {
    teachers: Teacher[];
  };
};

export const getTeachersActionSchema = {
  type: "get-teachers",
  payload: {},
  response: {
    teachers: Joi.array().items(teacherSchema)
  }
};
