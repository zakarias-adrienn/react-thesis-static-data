import * as React from "react";
import { Checkbox } from "office-ui-fabric-react/lib/Checkbox";
import { Stack } from "office-ui-fabric-react/lib/Stack";

// Used to add spacing between example checkboxes
const stackTokens = { childrenGap: 10 };

const ChooseTheme: React.FunctionComponent = () => {
  // These checkboxes are uncontrolled because they don't set the `checked` prop.
  return (
    <div>
      <p style={{ fontWeight: 600 }}>Milyen típusú témát keresel?</p>
      <Stack tokens={stackTokens} id="chooseType" style={{ marginBottom: "10px" }}>
        <Checkbox label="BSc Szakdolgozati" /*onChange={_onChange}*/ />
        <Checkbox label="BSc TDK" /*onChange={_onChange}*/ />
        <Checkbox label="MSc Szakdolgozati" />
        <Checkbox label="MSc TDK" />
        <Checkbox label="Projekt" />
      </Stack>
    </div>
  );
};

export default ChooseTheme;
