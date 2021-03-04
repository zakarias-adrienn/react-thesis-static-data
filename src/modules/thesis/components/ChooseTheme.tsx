import * as React from "react";
import { Checkbox } from "office-ui-fabric-react/lib/Checkbox";
import { Stack } from "office-ui-fabric-react/lib/Stack";

// Used to add spacing between example checkboxes
const stackTokens = { childrenGap: 10 };

export type CheckedOptions = {
  BScThesis: boolean;
  BScTDK: boolean;
  MScThesis: boolean;
  MScTDK: boolean;
  Projekt: boolean;
};

type Prop = {
  checked: CheckedOptions;
  onChange: Function;
};

const ChooseTheme: React.FunctionComponent<Prop> = (props) => {
  // These checkboxes are uncontrolled because they don't set the `checked` prop.
  return (
    <div>
      <p style={{ fontWeight: 600 }}>Milyen típusú témát keresel?</p>
      <Stack tokens={stackTokens} id="chooseType" style={{ marginBottom: "10px" }}>
        <Checkbox
          label="BSc Szakdolgozati"
          checked={props.checked.BScThesis}
          onChange={() => props.onChange("BScThesis")}
        />
        <Checkbox
          label="BSc TDK"
          checked={props.checked.BScTDK}
          onChange={() => props.onChange("BScTDK")}
        />
        <Checkbox
          label="MSc Szakdolgozati"
          checked={props.checked.MScThesis}
          onChange={() => props.onChange("MScThesis")}
        />
        <Checkbox
          label="MSc TDK"
          checked={props.checked.MScTDK}
          onChange={() => props.onChange("MScTDK")}
        />
        <Checkbox
          label="Projekt"
          checked={props.checked.Projekt}
          onChange={() => props.onChange("Projekt")}
        />
      </Stack>
    </div>
  );
};

export default ChooseTheme;
