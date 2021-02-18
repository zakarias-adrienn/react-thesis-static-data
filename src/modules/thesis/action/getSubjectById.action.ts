import { Subject, subjectSchema } from "../model/subjects.model";

const Joi = require("joi");

export type getSubjectByIdAction = {
  type: "get-subject";
  payload: {
    subjectId: string;
  };
  response: {
    subject: Subject;
  };
};

export const getSubjectByIdActionSchema = {
  type: "get-subject",
  payload: {
    subjectId: Joi.string().required()
  },
  response: {
    subject: subjectSchema
  }
};
