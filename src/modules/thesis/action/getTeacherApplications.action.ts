import { Application, applicationSchema } from "../model/application.model";
import { Topic, topicSchema } from "../model/topics.model";

const Joi = require("joi");

export type getTeacherApplicationsAction = {
  type: "get-student-topics";
  payload: {
    teacherId: string;
  };
  response: {
    applications: Application[];
  };
};

export const getTeacherApplicationsActionSchema = {
  type: "get-student-topics",
  payload: {
    teacherId: Joi.string().required()
  },
  response: {
    applications: Joi.array().items(applicationSchema)
  }
};
