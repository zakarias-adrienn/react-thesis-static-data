const Joi = require("joi");

// topicApi.delete(id) - hozzátartozó jelentkezések is törlődjenek
export type deleteTopicAction = {
  type: "delete-topic";
  payload: {
    topicId: string;
    teacherId: string; //igazából benne van a topicban
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
