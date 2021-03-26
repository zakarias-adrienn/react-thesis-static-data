import { ComponentType } from "react";
import { Schema } from "joi";
import { TranslationString } from "./translation-string.type";

export type ModuleRoot = ComponentType;

export type ModuleModel = {
  name: string;
  schema: Schema;
};

export type ModuleSetting = {
  type: "boolean" | "number" | "string" | "enum" | "array" | "object";
  enum?: string[];
  default: any;
  description: TranslationString;
};

export type ModuleMetaData = {
  name: TranslationString;
  description: TranslationString;
  icon: ComponentType;
};

export type ModuleAction = {
  type: string;
  payload: Object;
  response: Object;
};

/**
 * Describes, how a module looks like.
 */
export type Module = {
  root: ModuleRoot;
  model: ModuleModel[];
  settings?: ModuleSetting[];
  actions?: ModuleAction[];
  meta?: ModuleMetaData;
};
