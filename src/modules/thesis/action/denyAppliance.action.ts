const Joi = require("joi");

// applicationApi.update(id, {status: ApplicationStatus.DENIED, denyReason: something})
export type denyApplianceAction = {
  type: "deny-appliance";
  payload: {
    studentId: string;
    applicationId: string;
    teacherId: string;
    // fel kellene küldeni a változtatottat is? vagy szerveroldal állítja a státuszát át?
    // reason-t esetleg fel kellene küldeni?
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
