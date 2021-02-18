const Joi = require("joi");

export type withdrawApplianceAction = {
  type: "withdraw-appliance";
  payload: {
    studentId: string;
    applicationId: string;
  };
  response: {
    success: boolean;
  };
};

export const withdrawApplianceActionSchema = {
  type: "withdraw-appliance",
  payload: {
    studentId: Joi.string().required(),
    applicationId: Joi.string().required()
  },
  response: {
    success: Joi.boolean()
  }
};
