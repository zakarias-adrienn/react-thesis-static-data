import React from "react";

const WelcomeMessage: React.FunctionComponent = () => {
  return (
    <div style={{ marginTop: "30px" }}>
      <h2 style={{ letterSpacing: "1.5px" }}>
        Üdvözlet a Szakdolgozat- és TDK-dolgozat Témakereső Modulban!
      </h2>
      <div>
        Tudnivalók a szakdolgozat elkészítéséről diákoknak:
        <ol style={{ lineHeight: "25px" }}>
          <li>
            A programtervező informatikus alap és mesterképzésen (magyar és angol nyelv esetén is) a
            szakdolgozati témabejelentő beadása elektronikus kérvény formájában történik a Neptun
            felületén.Többszöri beadás esetén mindig a legutoljára beadott kérvény az érvényes.
            <ul>
              <li>
                Beadási határideje a <b>júniusban</b> záróvizsgázó hallgatók számára{" "}
                <b>december 1.</b>
              </li>
              <li>
                Beadási határideje a <b>januárban</b> záróvizsgázó hallgatók számára{" "}
                <b>június 1.</b>
              </li>
            </ul>
          </li>
          <li>
            A Témabejelentő kérvény <b>december 2-15.</b> között, illetve <b>június 2-15</b> között
            (pótlási időszak) késedelmi díjjal adható le.
          </li>
          <li>
            A HKR 77. § szerint a szakdolgozat témájának módosítására júniusi záróvizsga esetén{" "}
            <b>február 1-ig</b>, januári záróvizsga esetén <b>augusztus 31-ig</b> van lehetősége.
          </li>
        </ol>
      </div>
      <div>
        Miért érdemes TDK dolgozatot írni?
        <ol style={{ lineHeight: "25px" }}>
          <li>Sok hasznos tapasztalatot nyújt a szakdolgozat elkészítéséhez</li>

          <li>Jó témával és átdolgozással akár szakdolgozat is lehet belőle</li>

          <li>Jelentős pontokat jelent a köztársasági, a kari tudományos ösztöndíjak esetén</li>

          <li>Plusz pontok az MSc-re, doktori iskolába való felvételinél</li>

          <li>Tapasztalat a tudományos tevékenység végzésében</li>

          <li>Tanárokkal való „baráti kapcsolatban” tudományos munka végzése</li>

          <li>
            Elmerülhetsz az informatika egy szűk területében, amire az alap képzés nem nyújt
            lehetőséget
          </li>
        </ol>
        Az Informatika Kar TDK régi adatbázisa:{" "}
        <a href="http://tda.inf.elte.hu/" target="_blank">
          http://tda.inf.elte.hu/
        </a>
      </div>
      <br />
    </div>
  );
};

export default WelcomeMessage;
