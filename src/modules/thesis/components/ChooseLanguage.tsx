import * as React from "react";
import { Checkbox } from "office-ui-fabric-react/lib/Checkbox";
import { Stack } from "office-ui-fabric-react/lib/Stack";

const stackTokens = { childrenGap: 10 };

export type CheckedOptionsL = {
  hungarian: boolean;
  english: boolean;
};

type Prop = {
  checked: CheckedOptionsL;
  onChange: Function;
};

const ChooseLanguage: React.FunctionComponent<Prop> = (props) => {
  return (
    <div>
      <p style={{ fontWeight: 600 }}>Milyen nyelvű témát keresel?</p>
      <Stack tokens={stackTokens} id="chooseLanguage">
        <Checkbox
          label="magyar"
          onChange={() => props.onChange("hungarian")}
          checked={props.checked.hungarian}
        />
        <Checkbox
          label="angol"
          onChange={() => props.onChange("english")}
          checked={props.checked.english}
        />
      </Stack>
    </div>
  );
};

export default ChooseLanguage;
