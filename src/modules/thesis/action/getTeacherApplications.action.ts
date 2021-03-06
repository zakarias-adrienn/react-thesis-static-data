import { Application, applicationSchema } from "../model/application.model";

const Joi = require("joi");

// applicationApi.getAll().where(teacherId="ss3")
export type getTeacherApplicationsAction = {
  type: "get-teacher-applications";
  payload: {
    teacherId: string;
  };
  response: {
    applications: Application[];
  };
};

export const getTeacherApplicationsActionSchema = {
  type: "get-teacher-applocations",
  payload: {
    teacherId: Joi.string().required()
  },
  response: {
    applications: Joi.array().items(applicationSchema)
  }
};
