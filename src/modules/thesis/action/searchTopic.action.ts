import { Topic, topicSchema } from "../model/topics.model";
import { SearchData, searchDataSchema } from "../model/searchdata.model";

const Joi = require("joi");

// inkább kliens oldalon oldom meg a keresést, úgyhogy ez nem fog kelleni
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
