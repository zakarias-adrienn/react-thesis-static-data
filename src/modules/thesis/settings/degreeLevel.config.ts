import { ModuleSetting } from "../../../broker/module.type";

export const degreeLevelSetting: ModuleSetting = {
  type: "enum",
  enum: ["BSc", "MSc"],
  default: "BSc",
  description: {
    en: "Level of study",
    hu: "Képzés szintje"
  }
};
