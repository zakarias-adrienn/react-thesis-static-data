const Joi = require("joi");

// applicationApi.add({studentId, topicId, status: pending})
export type applyToTopicAction = {
  type: "apply-topic";
  payload: {
    studentId: string;
    topicId: string;
  };
  response: {
    success: boolean;
  };
};

export const applyToTopicActionSchema = {
  type: "apply-topic",
  payload: {
    studentId: Joi.string().required(),
    topicId: Joi.string().required()
  },
  response: {
    success: Joi.boolean()
  }
};
