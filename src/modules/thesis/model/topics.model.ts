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
  MScTDK
}

export enum TopicStatus {
  Accepted,
  Denied,
  Pending,
  Announced
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
  schoolSemester: SchoolSemester;
  status: TopicStatus;
  appliedStudentIds: string[];
  language: Language[];
};

export const topicSchema = Joi.object({
  id: Joi.string().required(),
  // ezt a jelleget jobban szét kellene szedni? bsc? msc majd ezen belül?
  type: Joi.array()
    .items(Joi.string().valid("bsc-thesis", "bsc-tdk", "msc-thesis", "msc-tdk"))
    .required(),
  title: Joi.string().required(),
  description: Joi.string().required(),
  teacherId: Joi.string().required(),
  connectedSubjectIds: Joi.array().items(Joi.string()), // ez nem required?,
  connectedTechnologyIds: Joi.array().items(Joi.string()), // ez nem required?,
  numberOfPlaces: Joi.number().min(1).required(),
  schoolSemester: Joi.string().required(), //ehhez valami regexp? - ketté szedni hogy tavaszi, őszi?
  // a diák szempontjából kellenek állapotok
  status: Joi.string().valid("accepted", "denied", "pending", "announced").required(), //amikor csak meg lett hirdetve s még senki nem jelentkezett? vagy ne legyen required s akkor indulásból semmi ez?
  appliedStudentIds: Joi.array().items(Joi.string()),
  language: Joi.string().valid("english", "hungarian").required() // lehet egyszerre angol és magyar is?
});
