const Joi = require("joi");

// kell külön a teacherId? vagy az a topic-ban benne van?
export type denyApplianceAction = {
  type: "deny-appliance";
  payload: {
    studentId: string;
    applicationId: string;
    teacherId: string;
  };
  response: {
    success: boolean;
  };
};

export const denyApplianceActionSchema = {
  type: "deny-appliance",
  payload: {
    studentId: Joi.string().required(),
    applicationId: Joi.string().required(),
    teacherId: Joi.string().required()
  },
  response: {
    success: Joi.boolean()
  }
};
