import { ComponentType } from "react";
import { Schema } from "joi";

export type ModuleRoot = ComponentType;
export type ModuleModel = Schema;
export type ModuleSetting = {
  type: "boolean" | "number" | "string" | "enum" | "array" | "object";
  enum?: string[];
  default: any;
  description: {
    en: string;
    hu: string;
  };
};
// TODO: egységesen kellene
export type ModuleAction = {
  type: string;
  payload: Object;
  response: Object;
};

export type Module = {
  root: ModuleRoot;
  model?: ModuleModel[];
  settings?: ModuleSetting[];
  actions?: ModuleAction[];
};
