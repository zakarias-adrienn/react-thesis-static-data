const Joi = require("joi");

export enum Semester {
  Autumn,
  Spring
}

export type SchoolSemester = {
  year: number;
  half: Semester;
};

export enum TopicType {
  BScThesis,
  BScTDK,
  MScThesis,
  MScTDK,
  Project
}

export enum Language {
  Hungarian,
  English
}

export type Topic = {
  id: string;
  type: TopicType[];
  title: string;
  description: string;
  teacherId: string;
  connectedSubjectIds: string[];
  connectedTechnologyIds: string[];
  numberOfPlaces: number;
  schoolSemester: SchoolSemester | undefined; // ha tetszőleges?
  appliedStudentIds: string[];
  language: Language[];
};

// JOI-s sémák

export const schoolSemesterSchema = Joi.object({
  year: Joi.number().min(2021).required(),
  half: Joi.string().valid("autumn", "spring").required()
});

export const topicTypeSchema = Joi.array()
  .items(Joi.string().valid("bsc-thesis", "bsc-tdk", "msc-thesis", "msc-tdk", "project"))
  .required();

export const languageSchema = Joi.array()
  .items(Joi.string().valid("english", "hungarian"))
  .required();

export const topicSchema = Joi.object({
  id: Joi.string().required(),
  type: topicTypeSchema,
  title: Joi.string().required(),
  description: Joi.string().required(),
  teacherId: Joi.string().required(),
  connectedSubjectIds: Joi.array().items(Joi.string()),
  connectedTechnologyIds: Joi.array().items(Joi.string()),
  numberOfPlaces: Joi.number().min(1).required(),
  schoolSemester: schoolSemesterSchema,
  appliedStudentIds: Joi.array().items(Joi.string()),
  language: languageSchema,
  denyReason: Joi.string()
});
