import { Module } from "../../broker/types/module.type";
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
import { withdrawApplianceActionSchema } from "./action/withdrawAppliance.action";
import Thesis from "./components/Thesis";
import { practiceSchema } from "./model/practice.model";

export const ThesisModule: Module = {
  root: Thesis,
  //path: rootPath,
  model: [
    { name: "Technology", schema: technologiesSchema },
    { name: "Topic", schema: topicSchema },
    { name: "Application", schema: applicationSchema },
    { name: "Practice", schema: practiceSchema }
  ],
  settings: [
    themeSetting,
    degreeLevelSetting,
    specializationBScSetting,
    specializationMScSetting,
    startYearSetting
  ],
  // nem lesznek használva
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
    withdrawApplianceActionSchema
  ]
};
