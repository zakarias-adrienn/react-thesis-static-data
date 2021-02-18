const Joi = require("joi");

export enum ApplicationStatus {
  Accepted,
  Denied,
  Pending
}

export type Application = {
  id: string;
  studentId: string;
  topicId: string;
  status: ApplicationStatus;
};

export const applicationStatusSchema = Joi.string()
  .valid("accepted", "denied", "pending")
  .required();

export const applicationSchema = Joi.object({
  id: Joi.string().required(),
  studentId: Joi.string().required(),
  topicId: Joi.string().required(),
  status: applicationStatusSchema
});
