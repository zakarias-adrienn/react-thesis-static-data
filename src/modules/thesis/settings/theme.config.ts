import { ModuleSetting } from "../../../broker/types/module.type";

export const themeSetting: ModuleSetting = {
  type: "enum",
  enum: ["light", "dark"],
  default: "light",
  description: {
    en: "Theme",
    hu: "Téma"
  }
};
