const Joi = require("joi");

export type Department = {
  id: string;
  name: string;
  shortName: string;
};

export enum Role {
  Student,
  Teacher,
  Admin
  // dropdown-ból kiválaszthatja hogy milyen szerepkörből szeretné nézni?
}

export type User = {
  id: string;
  name: string;
  neptunId: string;
  infId: string;
  roles: Role[];
};

export type Student = {
  userId: string;
  courseIds: number[];
  specializationId: number;
  startYear: number;
  maxSemester: number;
};

export type Teacher = {
  userId: string;
  courseIds: number[];
  profActivity: Date[];
  zeroAdminIds: number[];
  departmentId: string;
  announcedTopicIds: string[];
};

export const userSchema = Joi.object({
  // id: Joi.string().required(), - szerveroldal kellene generálja
  name: Joi.string().required(),
  neptunId: Joi.string().required(),
  infId: Joi.string().required()
  // roles?
});

export const studentSchema = Joi.object({
  userId: Joi.string().required(),
  courseIds: Joi.array().items(Joi.number()),
  specializationId: Joi.number(),
  startYear: Joi.number(),
  maxSemester: Joi.number()
});

export const departmentSchema = Joi.object({
  id: Joi.string().required(),
  name: Joi.string().required(),
  shortName: Joi.string().required()
}).required();

export const teacherSchema = Joi.object({
  userId: Joi.string().required(),
  courseIds: Joi.array().items(Joi.number()),
  profActivity: Joi.array().items(Joi.string()),
  zeroAdminIds: Joi.array().items(Joi.number()),
  departmentId: Joi.string().required(),
  announcedTopicIds: Joi.array().items(Joi.string())
});
