// hogy tanár alapján tudjon keresni kell tanár séma is?

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
};

export const teacherSchema = Joi.object({
  id: Joi.string().required(),
  name: Joi.string().required(),
  department: Joi.string().required(),
  announcedTopicIds: Joi.array().items(Joi.string())
});
