import { ModuleSetting } from "../../../broker/module.type";

// angol mesterik?
export const specializationMScSetting: ModuleSetting = {
  type: "enum",
  enum: ["Modellező", "Szoftvertechnológia", "Információs rendszerek"],
  default: "Modellező",
  description: {
    en: "Specialization",
    hu: "Szakirány"
  }
};
