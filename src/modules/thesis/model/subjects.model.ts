// ez lehetne egybe a Móniéval? s akkor csak egy classApi vagy subjectApi-kellene, mindketten használhatnánk?
// vagy legyen két külön api?

const Joi = require("joi");

export type Subject = {
  id: string;
  name: string;
};

// tantárgyak annak függvényében jelenjenek meg hogy milyen tanterven van?, mikor kezdte?
export const subjectSchema = Joi.object({
  id: Joi.string().required(),
  name: Joi.string().required()
});

// Móni
/*
import Joi from "joi";

export enum ClassType {
  compulsory,
  elective,
  optional
}

export enum Term {
  spring,
  autumn,
  both
}

export type Class = {
  id: string; //like IKP-...
  name: string;
  type: ClassType;
  term: Term;
};

export const TermSchema = Joi.string().valid("spring", "autumn", "both").required();

export const ClassTypeSchema = Joi.string().valid("compulsory", "elective", "optional").required();

export const ClassSchema = Joi.object({
  id: Joi.string().required(),
  //should be unique
  name: Joi.string().required(),
  type: ClassTypeSchema,
  term: TermSchema
  //useful?
});
*/
