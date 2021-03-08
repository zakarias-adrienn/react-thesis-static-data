const Joi = require("joi");

export type acceptApplianceAction = {
  type: "accept-appliance";
  payload: {
    studentId: string;
    applicationId: string;
    teacherId: string;
  };
  response: {
    success: boolean;
  };
};

export const acceptApplianceActionSchema = {
  type: "accept-appliance",
  payload: {
    studentId: Joi.string().required(),
    applicationId: Joi.string().required(),
    teacherId: Joi.string().required()
  },
  response: {
    success: Joi.boolean()
  }
};
