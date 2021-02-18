const Joi = require("joi");

export type deleteTopicAction = {
  type: "delete-topic";
  payload: {
    topicId: string;
    teacherId: string;
  };
  response: {
    success: boolean;
  };
};

export const deleteTopicActionSchema = {
  type: "delete-topic",
  payload: {
    topicId: Joi.string().required(),
    teacherId: Joi.string().required()
  },
  response: {
    success: Joi.boolean()
  }
};
