import { Topic, topicSchema } from "../model/topics.model";

const Joi = require("joi");

// topicApi.getAll().where(teacherId="ss3")
export type getTeacherTopicsAction = {
  type: "get-teacher-topics";
  payload: {
    teacherId: string;
  };
  response: {
    topics: Topic[];
  };
};

export const getTeacherTopicsActionSchema = {
  type: "get-teacher-topics",
  payload: {
    teacherId: Joi.string().required()
  },
  response: {
    topics: Joi.array().items(topicSchema)
  }
};
