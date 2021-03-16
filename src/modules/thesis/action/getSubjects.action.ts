import { Subject, subjectSchema } from "../model/subjects.model";

const Joi = require("joi");

// subjectApi.getAll()
export type getSubjectsAction = {
  type: "get-subjects";
  payload: {};
  response: {
    subjects: Subject[];
  };
};

export const getSubjectsActionSchema = {
  type: "get-subjects",
  payload: {},
  response: {
    subjects: Joi.array().items(subjectSchema)
  }
};
