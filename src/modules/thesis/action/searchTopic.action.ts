import { Topic, topicSchema } from "../model/topics.model";
import { SearchData, searchDataSchema } from "../model/searchdata.model";

const Joi = require("joi");

export type searchTopicAction = {
  type: "search-topic";
  payload: {
    searchData: SearchData;
  };
  response: {
    topics: Topic[];
  };
};

export const searchTopicActionSchema = {
  type: "search-topic",
  payload: {
    searchData: searchDataSchema
  },
  response: {
    topics: Joi.array().items(topicSchema)
  }
};
