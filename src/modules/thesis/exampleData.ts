import { Application, ApplicationStatus } from "./model/application.model";
import { Practice } from "./model/practice.model";
import { ClassType, Subject, SubjectSemester } from "./model/subjects.model";
import { Technology } from "./model/technologies.model";
import { Language, Topic, TopicType, Semester } from "./model/topics.model";
import { Department, Role, Teacher, User } from "./model/user.model";

export const exampleTechnologies: Technology[] = [
  { id: "JAVA", name: "JAVA" },
  { id: "C", name: "C" },
  { id: "C++", name: "C++" },
  { id: "C#", name: "C#" },
  { id: "Python", name: "Python" },
  { id: "SQL", name: "SQL" },
  { id: "MySQL", name: "MySQL" },
  { id: "SQLite", name: "SQLite" },
  { id: "React", name: "React" },
  { id: "Angular", name: "Angular" },
  { id: "Oracle", name: "Oracle" },
  { id: "HTML5", name: "HTML5" },
  { id: "CSS3", name: "CSS3" }
];

export const exampleSubjects: Subject[] = [
  {
    neptunId: "Mesterséges intelligencia",
    name: "Mesterséges intelligencia",
    semester: [SubjectSemester.autumn],
    classType: ClassType.compulsory,
    preferredSemester: 5,
    subjectGroupId: 0,
    credit: 0
  },
  {
    neptunId: "Webprogramozás",
    name: "Webprogramozás",
    semester: [SubjectSemester.autumn],
    classType: ClassType.compulsory,
    preferredSemester: 3,
    subjectGroupId: 0,
    credit: 0
  },
  {
    neptunId: "Algoritmusok és adatszerkezetek 1",
    name: "Algoritmusok és adatszerkezetek 1",
    semester: [SubjectSemester.spring],
    classType: ClassType.compulsory,
    preferredSemester: 2,
    subjectGroupId: 0,
    credit: 0
  },
  {
    neptunId: "Algoritmusok és adatszerkezetek 2",
    name: "Algoritmusok és adatszerkezetek 2",
    semester: [SubjectSemester.autumn],
    classType: ClassType.compulsory,
    preferredSemester: 3,
    subjectGroupId: 0,
    credit: 0
  },
  {
    neptunId: "Kliensoldali webprogramozás",
    name: "Kliensoldali webprogramozás",
    semester: [SubjectSemester.autumn],
    classType: ClassType.elective,
    preferredSemester: 3,
    subjectGroupId: 0,
    credit: 0
  },
  {
    neptunId: "Szerveroldali webprogramozás",
    name: "Szerveroldali webprogramozás",
    semester: [SubjectSemester.autumn],
    classType: ClassType.elective,
    preferredSemester: 3,
    subjectGroupId: 0,
    credit: 0
  },
  {
    neptunId: "Adatbázisok 1",
    name: "Adatbázisok 1",
    semester: [SubjectSemester.autumn],
    classType: ClassType.compulsory,
    preferredSemester: 4,
    subjectGroupId: 0,
    credit: 0
  },
  {
    neptunId: "Adatbázisok 2",
    name: "Adatbázisok 2",
    semester: [SubjectSemester.autumn],
    classType: ClassType.elective,
    preferredSemester: 5,
    subjectGroupId: 0,
    credit: 0
  }
];

export const exampleApplications: Application[] = [
  {
    id: "első",
    studentId: "Szemenyei Mónika Réka",
    topicId: "Youniversity",
    status: ApplicationStatus.Accepted,
    acceptReason:
      "Kérlek mihamarabb jelezz vissza, hogy mikor lenne megfelelő neked egy megbeszélés!"
  },
  {
    id: "második",
    studentId: "Zakariás Adrienn",
    topicId: "Youniversity",
    status: ApplicationStatus.Pending
  },
  {
    id: "harmadik",
    studentId: "Zakariás Adrienn",
    topicId: "Téma1",
    status: ApplicationStatus.Pending
  },
  {
    id: "negyedik",
    studentId: "Zakariás Adrienn",
    topicId: "Téma2",
    status: ApplicationStatus.Pending
  }
];

export const exampleTopics: Topic[] = [
  {
    id: "Téma1",
    type: [TopicType.BScThesis],
    title: "Téma1",
    description: "Valami...",
    teacherId: "17",
    connectedSubjectIds: [],
    connectedTechnologyIds: [],
    numberOfPlaces: 2,
    schoolSemester: {
      year: 2022,
      half: Semester.Spring
    },
    appliedStudentIds: ["a"],
    language: [Language.Hungarian]
  },
  {
    id: "Téma2",
    type: [TopicType.BScThesis],
    title: "Téma2",
    description: "Valami...",
    teacherId: "17",
    connectedSubjectIds: [],
    connectedTechnologyIds: [],
    numberOfPlaces: 2,
    schoolSemester: {
      year: 2022,
      half: Semester.Spring
    },
    appliedStudentIds: ["a"],
    language: [Language.Hungarian]
  },
  {
    id: "Youniversity",
    type: [TopicType.BScThesis],
    title: "Youniversity",
    description: "Oktatásszervezési csomag fejlesztése egyetemünk számára",
    teacherId: "17",
    connectedSubjectIds: [
      "Webprogramozás",
      "Kliensoldali webprogramozás",
      "Szerveroldali webprogramozás"
    ],
    connectedTechnologyIds: ["React"],
    numberOfPlaces: 3,
    schoolSemester: {
      year: 2020,
      half: Semester.Spring
    },
    appliedStudentIds: [],
    language: [Language.Hungarian]
  },
  {
    id: "Téma3",
    type: [TopicType.MScTDK],
    title: "Téma3",
    description: "Oktatásszervezési csomag fejlesztése egyetemünk számára",
    teacherId: "hat",
    connectedSubjectIds: [],
    connectedTechnologyIds: [],
    numberOfPlaces: 0,
    schoolSemester: null,
    appliedStudentIds: [],
    language: [Language.Hungarian, Language.English]
  },
  {
    id: "Téma4",
    type: [TopicType.MScTDK],
    title: "Téma4",
    description: "Bonyolult",
    teacherId: "tíz",
    connectedSubjectIds: ["Algoritmusok és adatszerkezetek 2"],
    connectedTechnologyIds: ["C++"],
    numberOfPlaces: 1,
    schoolSemester: null,
    appliedStudentIds: [],
    language: [Language.Hungarian]
  },
  {
    id: "Téma5",
    type: [TopicType.BScThesis],
    title: "Téma5",
    description: "Bonyolult",
    teacherId: "tíz",
    connectedSubjectIds: ["Adatbázisok 1", "Adatbázisok 2"],
    connectedTechnologyIds: ["Oracle", "MySQL", "SQLite"],
    numberOfPlaces: 1,
    schoolSemester: null,
    appliedStudentIds: [],
    language: [Language.Hungarian]
  }
];

export const exampleDepartments: Department[] = [
  {
    id: "egy",
    name: "Algoritmusok és Alkalmazásaik",
    shortName: "ALAL"
  },
  {
    id: "kettő",
    name: "Információs Rendszerek",
    shortName: "IR"
  },
  {
    id: "három",
    name: "Komputeralgebra",
    shortName: "COMPALG"
  },
  {
    id: "négy",
    name: "Numerikus Analízis",
    shortName: "NUMANAL"
  },
  {
    id: "öt",
    name: "Programozáselmélet és Szoftvertechnológiai",
    shortName: "PSZT"
  },
  {
    id: "hat",
    name: "Programozási Nyelvek és Fordítóprogramok",
    shortName: "PLC"
  },
  { id: "hét", name: "Média- és Oktatásinformatika", shortName: "MOT" },
  { id: "nyolc", name: "Valószínűségelméleti és Statisztika", shortName: "VALSTAT" },
  { id: "kilenc", name: "Térképtudományi és Geoinformatikai Intézet", shortName: "TERKEP" },
  { id: "tiz", name: "Adattudományi és Adattechnológiai", shortName: "T-LABS" },
  { id: "tizenegy", name: "Mesterséges Intelligencia", shortName: "NIPG" },
  { id: "tizenketto", name: "Savaria Műszaki Intézet", shortName: "SMI" }
];

export const exampleUsers: User[] = [
  {
    id: "egy",
    name: "Pusztai Kinga",
    neptunId: "",
    infId: "",
    roles: [Role.Teacher]
  },
  {
    id: "kettő",
    name: "Ásványi Tibor",
    neptunId: "",
    infId: "",
    roles: [Role.Teacher]
  },
  {
    id: "három",
    name: "Nagy Sára",
    neptunId: "",
    infId: "",
    roles: [Role.Teacher]
  },
  {
    id: "négy",
    name: "Veszprémi Anna",
    neptunId: "",
    infId: "",
    roles: [Role.Teacher]
  },
  {
    id: "öt",
    name: "Vadász Péter",
    neptunId: "",
    infId: "",
    roles: [Role.Teacher]
  },
  {
    id: "hat",
    name: "Dr. Csuhaj Varjú Erzsébet",
    neptunId: "",
    infId: "",
    roles: [Role.Teacher]
  },
  ///////////////////////////////////////////
  {
    id: "hét",
    name: "Dr. Kiss Attila",
    neptunId: "",
    infId: "",
    roles: [Role.Teacher]
  },
  {
    id: "nyolc",
    name: "Dr. Hajas Csilla",
    neptunId: "",
    infId: "",
    roles: [Role.Teacher]
  },
  {
    id: "kilenc",
    name: "Dr. Laki Sándor",
    neptunId: "",
    infId: "",
    roles: [Role.Teacher]
  },
  {
    id: "tíz",
    name: "Brányi László",
    neptunId: "",
    infId: "",
    roles: [Role.Teacher]
  },
  //////////////////////////////////////////////////////////////
  {
    id: "11",
    name: "Burcsi Péter",
    neptunId: "",
    infId: "",
    roles: [Role.Teacher]
  },
  {
    id: "12",
    name: "Dr. Járai Antal",
    neptunId: "",
    infId: "",
    roles: [Role.Teacher]
  },
  {
    id: "13",
    name: "Tóth Viktória",
    neptunId: "",
    infId: "",
    roles: [Role.Teacher]
  },
  /////////////////////////////////////////
  {
    id: "14",
    name: "Dr. Szarvas Kristóf",
    neptunId: "",
    infId: "",
    roles: [Role.Teacher]
  },
  ////////////////////////////////
  {
    id: "15",
    name: "Dr. Gregorics Tibor",
    neptunId: "",
    infId: "",
    roles: [Role.Teacher]
  },
  ////////////////////////////////////
  {
    id: "16",
    name: "Kitlei Róbert",
    neptunId: "",
    infId: "",
    roles: [Role.Teacher]
  },
  ///////////////////////////////
  {
    id: "17",
    name: "Visnovitz Márton",
    neptunId: "",
    infId: "",
    roles: [Role.Teacher]
  },
  ///////////////////////
  {
    id: "18",
    name: "Zempléni András",
    neptunId: "",
    infId: "",
    roles: [Role.Teacher]
  },
  ///////////////////////////////
  {
    id: "19",
    name: "Dr. Zentai László",
    neptunId: "",
    infId: "",
    roles: [Role.Teacher]
  },
  {
    id: "20",
    name: "Dr. Horváth Tamás",
    neptunId: "",
    infId: "",
    roles: [Role.Teacher]
  },
  {
    id: "21",
    name: "Belics Éva",
    neptunId: "",
    infId: "",
    roles: [Role.Teacher]
  },
  {
    id: "22",
    name: "Dr. Borbély Tibor",
    neptunId: "",
    infId: "",
    roles: [Role.Teacher]
  }
];

export const exampleTeachers: Teacher[] = [
  {
    userId: "egy",
    courseIds: [],
    profActivity: [],
    zeroAdminIds: [],
    departmentId: "egy",
    announcedTopicIds: []
  },
  {
    userId: "kettő",
    courseIds: [],
    profActivity: [],
    zeroAdminIds: [],
    departmentId: "egy",
    announcedTopicIds: []
  },
  {
    userId: "három",
    courseIds: [],
    profActivity: [],
    zeroAdminIds: [],
    departmentId: "egy",
    announcedTopicIds: []
  },
  {
    userId: "négy",
    courseIds: [],
    profActivity: [],
    zeroAdminIds: [],
    departmentId: "egy",
    announcedTopicIds: []
  },
  {
    userId: "öt",
    courseIds: [],
    profActivity: [],
    zeroAdminIds: [],
    departmentId: "egy",
    announcedTopicIds: []
  },
  {
    userId: "hat",
    courseIds: [],
    profActivity: [],
    zeroAdminIds: [],
    departmentId: "egy",
    announcedTopicIds: []
  },
  //////////////////////////////////////////////
  {
    userId: "hét",
    courseIds: [],
    profActivity: [],
    zeroAdminIds: [],
    departmentId: "kettő",
    announcedTopicIds: []
  },
  {
    userId: "nyolc",
    courseIds: [],
    profActivity: [],
    zeroAdminIds: [],
    departmentId: "kettő",
    announcedTopicIds: []
  },
  {
    userId: "kilenc",
    courseIds: [],
    profActivity: [],
    zeroAdminIds: [],
    departmentId: "kettő",
    announcedTopicIds: []
  },
  {
    userId: "tíz",
    courseIds: [],
    profActivity: [],
    zeroAdminIds: [],
    departmentId: "kettő",
    announcedTopicIds: []
  },
  //////////////////////////////////////////////
  {
    userId: "11",
    courseIds: [],
    profActivity: [],
    zeroAdminIds: [],
    departmentId: "három",
    announcedTopicIds: []
  },
  {
    userId: "12",
    courseIds: [],
    profActivity: [],
    zeroAdminIds: [],
    departmentId: "három",
    announcedTopicIds: []
  },
  {
    userId: "13",
    courseIds: [],
    profActivity: [],
    zeroAdminIds: [],
    departmentId: "három",
    announcedTopicIds: []
  },
  /////////////////////////////////////////////////
  {
    userId: "14",
    courseIds: [],
    profActivity: [],
    zeroAdminIds: [],
    departmentId: "négy",
    announcedTopicIds: []
  },
  ////////////////////////////////////////
  {
    userId: "15",
    courseIds: [],
    profActivity: [],
    zeroAdminIds: [],
    departmentId: "öt",
    announcedTopicIds: []
  },
  {
    userId: "16",
    courseIds: [],
    profActivity: [],
    zeroAdminIds: [],
    departmentId: "hat",
    announcedTopicIds: []
  },
  {
    userId: "17",
    courseIds: [],
    profActivity: [],
    zeroAdminIds: [],
    departmentId: "hét",
    announcedTopicIds: []
  },
  {
    userId: "18",
    courseIds: [],
    profActivity: [],
    zeroAdminIds: [],
    departmentId: "nyolc",
    announcedTopicIds: []
  },
  {
    userId: "19",
    courseIds: [],
    profActivity: [],
    zeroAdminIds: [],
    departmentId: "kilenc",
    announcedTopicIds: []
  },
  {
    userId: "20",
    courseIds: [],
    profActivity: [],
    zeroAdminIds: [],
    departmentId: "tiz",
    announcedTopicIds: []
  },
  {
    userId: "21",
    courseIds: [],
    profActivity: [],
    zeroAdminIds: [],
    departmentId: "tizenegy",
    announcedTopicIds: []
  },
  {
    userId: "22",
    courseIds: [],
    profActivity: [],
    zeroAdminIds: [],
    departmentId: "tizenketto",
    announcedTopicIds: []
  }
];

export const examplePractices: Practice[] = [
  {
    id: "a",
    company: "AGILEXPERT KFT.",
    contact: "E-mail: info@agilexpert.hu, Telefon: +36-70-609-1634",
    connectedTechnologyIds: ["SQL"],
    place: "Budapest",
    language: [Language.Hungarian],
    description: `A KÖVETKEZŐ FELTÉTELEKKEL VÁRUNK HALLGATÓKAT:
      Analitikus gondolkodásmód.
      Az objektum orientált programozás alapelveinek ismerete.
      Java vagy valamely objektum orientált programozási nyelv haladó szintű ismerete.
      Jártasság SQL lekérdezések készítésében.
      Alap szintű angol nyelvismeret, technikai szövegek értelmezése.`
  },
  {
    id: "b",
    company: "AP SOLUTION HUNGARY KFT.",
    contact: "danielk@apsolution.com.au, +36204559046",
    connectedTechnologyIds: ["React", "Angular"],
    place: "Budapest",
    language: [Language.Hungarian, Language.English],
    description:
      "Az AP Solution Hungary Kft. gyakornoki programját elsősorban másodévet már elvégzett hallgatók számára ajánljuk, akik szeretnék megtanult tudásukat a gyakorlatban is alkalmazni, és  valódi mobil- és webes alkalmazásokat fejleszteni. Cégünk saját termékek fejlesztése mellett magyar és ausztrál megrendelőkkel dolgozik. Csapatunk fiatalos, és ügyelünk rá, hogy mindig a legkorszerűbb technológiákat és eszközöket használjuk fejlesztéseink során, ahogy arra is, hogy a projekthez válasszuk a legalkalmasabb nyelvet és eszközöket, és ne fordítva."
  },
  {
    id: "c",
    company: "CURSOR INSIGHT HUNGARY KFT.",
    contact: "tamas@cursorinsight.com, +44 7785 227810",
    connectedTechnologyIds: [],
    place: "Budapest",
    language: [Language.Hungarian, Language.English],
    description:
      "A londoni Cursor Insight budapesti kutató- és fejlesztőbázisa digitálisan rögzített emberi és ember irányította eszközök mozgásának tudományos elemzésével foglalkozik. \nA cég saját fejlesztésű, robosztus és rugalmas mozgáselemző algoritmusa megnyerte a German Research Centre for Artificial Intelligence által megrendezett online kézi aláírás-verifikációs világversenyt (SigWIComp2015), amely során mozgásdinamika elemzése volt a versenyfeladat.Egy magyarországi vezető pénzintézeti ügyfelünk számára évi 100 milliós nagyságrendben végezzük el digitálisan rögzített ügyfélaláírások automatikus ellenőrzését egy szintén általunk tervezett, implementált és szabadalmi bejegyzés alatt lévő biometrikus elektronikus aláírás megoldás részeként."
  },
  {
    id: "d",
    company: "FINATECK KFT.",
    contact:
      "Kapcsolattartó: Kovács Vivien, Email: vivien@finateck.com, Telefonszám: +36 30 365 0844",
    connectedTechnologyIds: ["HTML", "PHP", "React", "Redux"],
    place: "Budapest",
    language: [Language.English],
    description: `A Finateck Kft. aktív marketing, fejlesztés és grafikai területeken is. A cég teljes marketing-kampányok elkészítésétől, kisebb méretű projektekig sokféle feladatot vállal: kreatív tervezés és írás, grafikai munkák, honlapfejlesztés, bannerkészítés, egyéb kiegészítő anyagok készítése, animációs és élőszereplős reklámfilm forgatás, SEO, médiatervezés és vásárlás.\nProjektjeink és ügyfeleink szinte kizárólag külföldiek, így a munkaképes angol elengedhetetlen a munkához.`
  }
];
