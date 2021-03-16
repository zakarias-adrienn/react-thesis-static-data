const Joi = require("joi");

// amilyen APIK kellenek ezekhez nekünk: departmentApi, studentApi, teacherApi, adminApi?
// vagy userApi s abból mi kiszűrjük hogy tanár-e stb? INSTANCEOF NEM MEGY TYPE-RA! csak ha class lenne!

// Gábor: permissions[] is legyen külön Teacher, Student-hez? az alapján jogosultságkezelés? - vagy fölösleges ez?

export type Department = {
  id: string;
  name: string;
  shortName: string;
};

export type User = {
  id: string;
  name: string;
  neptunId: string;
  infId: string;
};

export type Student = User & {
  courseIds: number[];
  // enum Specialization = { NULL, Szoftverfejlesztő, Szoftvertervező, Modellező } ?
};

export type Teacher = User & {
  // Móninak
  courseIds: number[];
  profActivity: Date[];
  zeroAdminIds: number[];
  // Adrinak
  departmentId: string;
  announcedTopicIds: string[];
}; // s itt még lehetne email-je?, weboldala? szobája?

export type Admin = User;

// JOI SÉMÁK:
export const userSchema = Joi.object({
  id: Joi.string().required(),
  name: Joi.string().required(),
  neptunId: Joi.string().required(),
  infId: Joi.string().required()
});

export const studentSchema = Joi.object({
  id: Joi.string().required(),
  name: Joi.string().required(),
  neptunId: Joi.string().required(),
  infId: Joi.string().required(),
  courseIds: Joi.array().items(Joi.number())
});

export const departmentSchema = Joi.object({
  id: Joi.string().required(),
  name: Joi.string().required(),
  shortName: Joi.string().required()
}).required();

export const teacherSchema = Joi.object({
  id: Joi.string().required(),
  name: Joi.string().required(),
  neptunId: Joi.string().required(),
  infId: Joi.string().required(),
  departmentId: Joi.string().required(),
  announcedTopicIds: Joi.array().items(Joi.string()),
  courseIds: Joi.array().items(Joi.number()),
  zeroAdminIds: Joi.array().items(Joi.number())
});
