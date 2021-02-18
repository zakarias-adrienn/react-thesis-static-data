const Joi = require("joi");

import { Subject, subjectSchema } from "../model/subjects.model";

// dropdownokban kell megjelenítenem
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
