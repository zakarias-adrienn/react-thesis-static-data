import { Topic, topicSchema } from "../model/topics.model";

const Joi = require("joi");

export type getTopicByIdAction = {
  type: "get-topic";
  payload: {
    topicId: string;
  };
  response: {
    topic: Topic;
  };
};

export const getTopicByIdActionSchema = {
  type: "get-topic",
  payload: {
    topicId: Joi.string().required()
  },
  response: {
    topic: topicSchema
  }
};
