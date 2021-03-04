const Joi = require("joi");

export type Department = {
  id: string;
  name: string;
  shortName: string;
};

export type Teacher = {
  id: string;
  name: string;
  department: Department;
  announcedTopicIds: string[];
  neptun: string;
  infIdentifier: string;
};

export const departmentSchema = Joi.object({
  id: Joi.string().required(),
  name: Joi.string().required(),
  shortName: Joi.string().required()
}).required();

export const teacherSchema = Joi.object({
  id: Joi.string().required(),
  name: Joi.string().required(),
  neptun: Joi.string().required(),
  infIdentifier: Joi.string().required(),
  department: departmentSchema,
  announcedTopicIds: Joi.array().items(Joi.string())
});
