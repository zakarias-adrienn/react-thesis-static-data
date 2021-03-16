const Joi = require("joi");

// technologyApi.delete(id)
export type deleteTechnologyAction = {
  type: "delete-technology";
  payload: {
    technologyId: string;
  };
  response: {
    success: boolean;
  };
};

export const deleteTechnologyActionSchema = {
  type: "delete-technology",
  payload: {
    technologyId: Joi.string().required()
  },
  response: {
    success: Joi.boolean()
  }
};
