import React from "react";
import InfoModal from "./InfoModal";

const deadlineText = (
  <ol style={{ lineHeight: "25px" }}>
    <li>
      A programtervező informatikus alap és mesterképzésen (magyar és angol nyelv esetén is) a
      szakdolgozati témabejelentő beadása elektronikus kérvény formájában történik a <b>Neptun</b>{" "}
      felületén.
      <br />
      Többszöri beadás esetén mindig a <b>legutoljára beadott</b> kérvény az érvényes.
      <ul>
        <li>
          Beadási határideje a <b>júniusban</b> záróvizsgázó hallgatók számára <b>december 1.</b>
        </li>
        <li>
          Beadási határideje a <b>januárban</b> záróvizsgázó hallgatók számára <b>június 1.</b>
        </li>
      </ul>
    </li>
    <li>
      A Témabejelentő kérvény <b>december 2-15.</b> között, illetve <b>június 2-15</b> között
      (pótlási időszak) <b>késedelmi díjjal</b> adható le.
    </li>
    <li>
      A HKR 77. § szerint a szakdolgozat témájának <b>módosítására</b> júniusi záróvizsga esetén{" "}
      <b>február 1-ig</b>, januári záróvizsga esetén <b>augusztus 31-ig</b> van lehetősége.
    </li>
    <li>
      Szakdolgozat és konzultációs lap leadásának határideje:
      <ul>
        <li>
          tavaszi félév esetén: <b>május 15.</b>
        </li>
        <li>
          őszi félév esetén: <b>december 15.</b>
        </li>
      </ul>
    </li>
  </ol>
);

const thesisDocsText = (
  <>
    <ul style={{ lineHeight: "25px" }}>
      <li>
        Korábbi elkészült szakdolgozatok megtekintése az{" "}
        <a href="https://edit.elte.hu/xmlui/handle/10831/27" target="_blank" rel="noreferrer">
          ELTE Digitális Intézményi Tudástárában
        </a>{" "}
        lehetséges.
      </li>
      <li>
        Szakdolgozat leadásához szükséges{" "}
        <a
          href="https://www.inf.elte.hu/content/adatlapok-formanyomtatvanyok.t.1052?m=129"
          target="_blank"
          rel="noreferrer"
        >
          dokumentumok
        </a>{" "}
        az ELTE IK oldalán találhatóak.
      </li>
      <li>
        Gombos Gergő által készített szakdolgozat{" "}
        <a
          href="http://ggombos.web.elte.hu/szakdoli/szakdoli_how_to.docx"
          target="_blank"
          rel="noreferrer"
        >
          word-sablon
        </a>
        .
      </li>
      <li>
        Cserép Máté által készített{" "}
        <a href="https://github.com/mcserep/elteikthesis" target="_blank" rel="noreferrer">
          LaTex-es szakdolgozat sablon
        </a>
        .
      </li>
    </ul>
    További tudnivalók az{" "}
    <a
      href="https://www.inf.elte.hu/szigorlat-szakdolgozat-zarovizsga"
      target="_blank"
      rel="noreferrer"
    >
      ELTE IK Tanulmányi Hivatal Szakdolgozat,Diplomamunka/Záróvizsga
    </a>{" "}
    menüpontban olvashatóak.
  </>
);

const bscThesisText = (
  <ul style={{ lineHeight: "25px" }}>
    <li>
      BSc szakdolgozat{" "}
      <a
        href="https://www.inf.elte.hu/dstore/document/257/PTI_BSc_szakdoli_uj.pdf"
        target="_blank"
        rel="noreferrer"
      >
        követelményei
      </a>{" "}
      részletesen szintén az IK oldalán olvashatóak.
    </li>
    <li>
      Szakdolgozat írásakor hasznos lehet{" "}
      <a
        href="https://www.inf.elte.hu/dstore/document/1667/Bsc_b%C3%ADr%C3%A1lat.docx"
        target="_blank"
        rel="norefferer"
      >
        BSc pontozási rendszer
      </a>{" "}
      megtekintése is.
    </li>
  </ul>
);

const tdkText = (
  <>
    <ol style={{ lineHeight: "25px" }}>
      <li>Sok hasznos tapasztalatot nyújt a szakdolgozat elkészítéséhez</li>

      <li>Jó témával és átdolgozással akár szakdolgozat is lehet belőle</li>

      <li>Jelentős pontokat jelent a köztársasági, a kari tudományos ösztöndíjak esetén</li>

      <li>Plusz pontok az MSc-re, doktori iskolába való felvételinél</li>

      <li>Tapasztalat a tudományos tevékenység végzésében</li>

      <li>Tanárokkal való „baráti kapcsolatban” tudományos munka végzése</li>

      <li>
        Elmerülhetsz az informatika egy szűk területében, amire az alap képzés nem nyújt lehetőséget
      </li>
    </ol>
    Az Informatika Kar TDK régi adatbázisa:{" "}
    <a href="http://tda.inf.elte.hu/" target="_blank" rel="noreferrer">
      http://tda.inf.elte.hu/
    </a>
  </>
);

const practiceText = (
  <>
    <p>
      2014-től az ELTE IK-n a diploma megszerzéséhez:
      <ul>
        <li>
          BSc-n <b>legalább 8 hét alatt legalább 320 munkaóra</b>
        </li>
        <li>
          MSc-n <b>legalább 6 hét alatt legalább 240 munkaóra</b>
        </li>
      </ul>
      elvégzése szükséges.
    </p>
    <p>
      A szakmai gyakorlatot a <b>végzés félévében</b> teljesítő hallgatóknak az abszolutórium
      kiállítása miatt, legkésőbb
      <ul>
        <li>
          a tavaszi félévben <b>május végéig</b>
        </li>
        <li>
          az őszi félévben <b>december első hetének végéig</b>
        </li>
      </ul>
      kell elvégeznie a gyakorlatát.
    </p>
    <p>
      Olyan cégnél lehet elvégezni a gyakorlatot, amelyet az Informatikai Kar előzetesen{" "}
      <b>befogad</b>.
      <br />A <b>szakmai gyakorlati helyek menüpontban</b> olyan cégek szerepelnek, melyek
      teljesítik ezt a követelményt.
      <br />
      <b>Új</b> cégekkel kötött együttműködési megállapodás megkötése, aláírása <b>több hetet</b> is
      igénybe vehet.
    </p>
    <p>
      Két dokumentum leadása szükséges a szakmai gyakorlat elfogadásához:
      <ul>
        <li>
          A <b>Befogadó-nyilatkozatot</b> a tanév során a szakmai gyakorlat megkezdése előtt{" "}
          <b>legalább 2 héttel</b>
          <br /> le kell adni az oktatási dékánhelyettes irodájában, aki a gyakorlat megkezdéséig
          hitelesíti azt.
        </li>
        <li>
          A <b>Referencialevelet</b> a gyakorlat teljesítését követően <b>30 napon belül</b> le kell
          adnia a hallgatónak
        </li>
      </ul>
    </p>
    <p>
      További információk a{" "}
      <a href="https://www.inf.elte.hu/szakmaigyakorlat" target="_blank" rel="norefferer">
        kari oldalon
      </a>{" "}
      olvashatóak.
    </p>
  </>
);

const WelcomeMessage: React.FunctionComponent = () => {
  return (
    <div style={{ marginTop: "30px" }}>
      <h2 style={{ letterSpacing: "1.5px" }}>
        Üdvözlet a Szakdolgozat- és TDK-dolgozat Témakereső Modulban!
      </h2>
      <br />
      <div className="ms-Grid" dir="ltr">
        <div className="ms-Grid-row">
          <div className="ms-Grid-col ms-sm6">
            <InfoModal
              title="Milyen határidőkre kell figyelni szakdolgozat írásakor?"
              content={deadlineText}
            />
            <br />
          </div>
          <div className="ms-Grid-col ms-sm6">
            <InfoModal
              title="Hogyan fogjunk neki a szakdolgozat megírásához?"
              content={thesisDocsText}
            />
          </div>
        </div>
        <div className="ms-Grid-row">
          <div className="ms-Grid-col ms-sm6">
            <InfoModal
              title="Hogyan történik egy elkészített BSc szakdolgozat értékelése?"
              content={bscThesisText}
            />
            <br />
          </div>
          <div className="ms-Grid-col ms-sm6">
            <InfoModal title="Miért érdemes TDK dolgozatot készíteni?" content={tdkText} />
          </div>
        </div>
        <div className="ms-Grid-row">
          <div className="ms-Grid-col ms-sm6">
            <InfoModal title="Mit érdemes a szakmai gyakorlatról tudni?" content={practiceText} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeMessage;
