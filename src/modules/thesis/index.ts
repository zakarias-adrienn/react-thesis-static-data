import { Module } from "../../broker/module.type";
import { studentSchema } from "./model/students.model";
import { subjectSchema } from "./model/subjects.model";
import { teacherSchema } from "./model/teachers.model";
import { technologiesSchema } from "./model/technologies.model";
import { topicSchema } from "./model/topics.model";

import { themeSetting } from "./settings/theme.config";
import { degreeLevelSetting } from "./settings/degreeLevel.config";
import { specializationBScSetting } from "./settings/specializationBSc.config";
import { specializationMScSetting } from "./settings/specializationMSc.config";
import { startYearSetting } from "./settings/startYear.config";

import WelcomePage from "./components/WelcomePage";

export const ThesisModule: Module = {
  root: WelcomePage,
  model: [studentSchema, subjectSchema, teacherSchema, technologiesSchema, topicSchema],
  settings: [
    themeSetting,
    degreeLevelSetting,
    specializationBScSetting,
    specializationMScSetting,
    startYearSetting
  ]
};
