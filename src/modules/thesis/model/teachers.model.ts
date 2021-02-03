// hogy tanár alapján tudjon keresni kell tanár séma is?

const Joi = require("joi");

// Tanszékek hogy lesznek tárolva?
// export enum Department = {

// }

export type Teacher = {
  id: string;
  name: string;
  department: string;
  announcedTopicIds: string[];
};

export const teacherSchema = Joi.object({
  id: Joi.string().required(),
  name: Joi.string().required(),
  department: Joi.string().required(),
  announcedTopicIds: Joi.array().items(Joi.string())
});
