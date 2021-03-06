import { Topic, topicSchema } from "../model/topics.model";

const Joi = require("joi");

// topicApi.add({type, title, description, teacherId, connectedSubjectIds, connectedTechnologyIds, numberOfPlaces, schoolSemester, appliedStudentIds, language});
export type createNewTopicAction = {
  type: "create-topic";
  payload: {
    topic: Topic;
    teacherId: string; // ez benne is lehet a Topic típusban
  };
  response: {
    success: boolean; //visszaadhatja a megkreált témát is
  };
};

export const createNewTopicActionSchema = {
  type: "create-topic",
  payload: {
    topic: topicSchema,
    teacherId: Joi.string().required()
  },
  response: {
    success: Joi.boolean()
  }
};
