import { Module } from "../../broker/module.type";
import { subjectSchema } from "./model/subjects.model";
import { technologiesSchema } from "./model/technologies.model";
import { topicSchema } from "./model/topics.model";
import { applicationSchema } from "./model/application.model";

import { themeSetting } from "./settings/theme.config";
import { degreeLevelSetting } from "./settings/degreeLevel.config";
import { specializationBScSetting } from "./settings/specializationBSc.config";
import { specializationMScSetting } from "./settings/specializationMSc.config";
import { startYearSetting } from "./settings/startYear.config";

import { acceptApplianceActionSchema } from "./action/acceptAppliance.action";
import { addNewTechnologyActionSchema } from "./action/addNewTechnology.action";
import { applyToTopicActionSchema } from "./action/applyToTopic.action";
import { createNewTopicActionSchema } from "./action/createNewTopic.action";
import { deleteTechnologyActionSchema } from "./action/deleteTechnology.action";
import { deleteTopicActionSchema } from "./action/deleteTopic.action";
import { denyApplianceActionSchema } from "./action/denyAppliance.action";
import { getStudentApplicationsActionSchema } from "./action/getStudentApplications.action";
import { getSubjectByIdActionSchema } from "./action/getSubjectById.action";
import { getSubjectsActionSchema } from "./action/getSubjects.action";
import { getTeacherApplicationsActionSchema } from "./action/getTeacherApplications.action";
import { getTeacherTopicsActionSchema } from "./action/getTeacherTopics.action";
import { getTechnologiesActionSchema } from "./action/getTechnologies.action";
import { getTechnologyByIdActionSchema } from "./action/getTechnologyById.action";
import { getTopicByIdActionSchema } from "./action/getTopicById.action";
import { modifyTechnologyActionSchema } from "./action/modifyTechnology.action";
import { modifyTopicActionSchema } from "./action/modifyTopic.action";
import { searchTopicActionSchema } from "./action/searchTopic.action";
import { withdrawApplianceActionSchema } from "./action/withdrawAppliance.action";
import Thesis from "./components/Thesis";
import { departmentSchema, studentSchema, teacherSchema, userSchema } from "./model/user.model";

export const ThesisModule: Module = {
  root: Thesis,
  model: [
    studentSchema,
    subjectSchema,
    teacherSchema,
    technologiesSchema,
    topicSchema,
    applicationSchema,
    userSchema,
    departmentSchema
  ],
  settings: [
    themeSetting,
    degreeLevelSetting,
    specializationBScSetting,
    specializationMScSetting,
    startYearSetting
  ],
  actions: [
    acceptApplianceActionSchema,
    addNewTechnologyActionSchema,
    applyToTopicActionSchema,
    createNewTopicActionSchema,
    deleteTechnologyActionSchema,
    deleteTopicActionSchema,
    denyApplianceActionSchema,
    getStudentApplicationsActionSchema,
    getSubjectByIdActionSchema,
    getSubjectsActionSchema,
    getTeacherApplicationsActionSchema,
    getTeacherTopicsActionSchema,
    getTechnologiesActionSchema,
    getTechnologyByIdActionSchema,
    getTopicByIdActionSchema,
    modifyTechnologyActionSchema,
    modifyTopicActionSchema,
    searchTopicActionSchema,
    withdrawApplianceActionSchema
  ]
};
