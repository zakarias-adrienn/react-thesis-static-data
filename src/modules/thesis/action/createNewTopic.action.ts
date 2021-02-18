import { Topic, topicSchema } from "../model/topics.model";

const Joi = require("joi");

export type createNewTopicAction = {
  type: "create-topic";
  payload: {
    topic: Topic;
    teacherId: string;
  };
  response: {
    success: boolean; //visszaadhatja a megkreált témát is
  };
};

export const createNewTopicActionSchema = {
  type: "create-topic",
  payload: {
    topic: topicSchema,
    teacherId: Joi.string().required()
  },
  response: {
    success: Joi.boolean()
  }
};
