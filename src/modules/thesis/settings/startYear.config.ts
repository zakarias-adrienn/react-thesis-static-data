import { ModuleSetting } from "../../../broker/types/module.type";

const currentYear = new Date().getFullYear();

export const startYearSetting: ModuleSetting = {
  type: "number",
  default: currentYear,
  description: {
    en: "Start year of study",
    hu: "Kezdés éve"
  }
};
