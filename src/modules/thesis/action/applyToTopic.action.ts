const Joi = require("joi");

/**
 * @param studentId - The student who is logged in
 * @param topicId - The chosen topic
 * @return success
 */
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
