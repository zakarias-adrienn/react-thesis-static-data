import * as React from "react";
import { Checkbox } from "office-ui-fabric-react/lib/Checkbox";
import { Stack } from "office-ui-fabric-react/lib/Stack";

// Used to add spacing between example checkboxes
const stackTokens = { childrenGap: 10 };

const ChooseTheme: React.FunctionComponent = () => {
  // These checkboxes are uncontrolled because they don't set the `checked` prop.
  return (
    <div>
      <p>Milyen témát keresel?</p>
      <Stack tokens={stackTokens}>
        <Checkbox label="Szakdolgozati" /*onChange={_onChange}*/ />
        <Checkbox label="TDK" /*onChange={_onChange}*/ />
      </Stack>
    </div>
  );
};

function _onChange(ev: React.FormEvent<HTMLElement>, isChecked: boolean) {
  console.log(`The option has been changed to ${isChecked}.`);
}

export default ChooseTheme;
