import { Application, applicationSchema } from "../model/application.model";

const Joi = require("joi");

// applicationApi.getAll().where(studentId = id)
export type getStudentApplicationsAction = {
  type: "get-student-topics";
  payload: {
    studentId: string;
  };
  response: {
    applications: Application[];
  };
};

export const getStudentApplicationsActionSchema = {
  type: "get-student-topics",
  payload: {
    studentId: Joi.string().required()
  },
  response: {
    applications: Joi.array().items(applicationSchema)
  }
};
