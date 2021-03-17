const Joi = require("joi");

export enum Semester {
  spring,
  autumn
}

export enum ClassType {
  compulsory,
  elective,
  optional
}

export type Subject = {
  neptunId: string;
  name: string;
  semester: Semester[];
  classType: ClassType;
  preferredSemester: number;
  subjectGroupId: number;
  credit: number;
  // preconditionIds: string[];
  // equivalenceIds: string[]; //kérdéses
};

export const semesterSchema = Joi.string().valid("spring", "autumn").required();

export const classTypeSchema = Joi.string().valid("compulsory", "elective", "optional").required();

export const subjectSchema = Joi.object({
  neptunId: Joi.string().required(),
  name: Joi.string().required(),
  semester: Joi.array().item(semesterSchema).max(2).min(1).required(),
  classType: Joi.enum().item(classTypeSchema).required(),
  preferredSemester: Joi.number().required(),
  subjectGroupId: Joi.number().required(),
  credit: Joi.number().required(),
  preconditionIds: Joi.array().item(Joi.string()).required(),
  equivalenceIds: Joi.array().item(Joi.string()).required()
});
