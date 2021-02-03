import { ModuleSetting } from "../../../broker/module.type";

export const specializationBScSetting: ModuleSetting = {
  type: "enum",
  enum: ["Modellező", "Szoftvertervező", "Szoftverfejlesztő"],
  default: "Modellező",
  description: {
    en: "Szakirány",
    hu: "Specialization"
  }
};
