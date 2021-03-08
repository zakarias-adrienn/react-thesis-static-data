import { SchoolSemester, Semester, Language, TopicType } from "./model/topics.model";

// A MEGJELENÍTÉSHEZ KONVERTÁLÓ FGVEK, MERT DETAILSLISTBEN STRINGKÉNT JELENÍTEM MEG
export const convertSchoolSemesterToString = (s: SchoolSemester) => {
  // a null eset már meg lett vizsgálva
  var stringResult: string = "";
  stringResult += s.year;
  stringResult += "/";
  stringResult += s.year + 1;
  stringResult += "-";
  stringResult += s.half === Semester.Autumn ? "ősz" : "tavasz";
  return stringResult;
};

export const convertLanguagesToString = (l: Language[]) => {
  var languages: string = "";
  l.forEach((language) =>
    language === Language.Hungarian
      ? languages.length > 0
        ? (languages += ", magyar")
        : (languages += "magyar")
      : languages.length > 0
      ? (languages += ", angol")
      : (languages += "angol")
  );
  return languages;
};

export const convertTypeToString = (t: TopicType[]) => {
  var types: string = "";
  t.forEach((type) => {
    switch (type) {
      case TopicType.BScTDK:
        types.length > 0 ? (types += ", BSc-TDK") : (types += "BSc-TDK");
        break;
      case TopicType.BScThesis:
        types.length > 0 ? (types += ", BSc-szakdolgozat") : (types += "BSc-szakdolgozat");
        break;
      case TopicType.MScTDK:
        types.length > 0 ? (types += ", MSc-TDK") : (types += "MSc-TDK");
        break;
      case TopicType.MScThesis:
        types.length > 0 ? (types += ", MSc-szakdolgozat") : (types += "MSc-szakdolgozat");
        break;
      default:
        types.length > 0 ? (types += ", projekt") : (types += "projekt");
    }
  });
  return types;
};
