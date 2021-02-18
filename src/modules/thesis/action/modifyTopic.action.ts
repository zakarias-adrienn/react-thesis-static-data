import { Topic, topicSchema } from "../model/topics.model";

const Joi = require("joi");

export type modifyTopicAction = {
  type: "modify-topic";
  payload: {
    topicId: string;
    topic: Topic; //amire módosítjuk
    teacherId: string;
  };
  response: {
    success: boolean; //visszaadhatja a módosított témát is
  };
};

export const modifyTopicActionSchema = {
  type: "modify-topic",
  payload: {
    topicId: Joi.string().required(),
    topic: topicSchema,
    teacherId: Joi.string().required()
  },
  response: {
    success: Joi.boolean()
  }
};
