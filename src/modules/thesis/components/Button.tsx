import * as React from "react";
import { PrimaryButton, Stack, IStackTokens } from "office-ui-fabric-react";

export interface IButtonExampleProps {
  // These are set based on the toggles shown above the examples (not needed in real code)
  disabled?: boolean;
  checked?: boolean;
}

// Example formatting
const stackTokens: IStackTokens = { childrenGap: 40 };

const Button: React.FunctionComponent<IButtonExampleProps> = (props) => {
  const { disabled, checked } = props;

  return (
    <Stack horizontal tokens={stackTokens}>
      <PrimaryButton
        text="Keresés"
        // onClick={_alertClicked}
        type="submit"
        allowDisabledFocus
        disabled={disabled}
        checked={checked}
      />
    </Stack>
  );
};

function _alertClicked(): void {
  alert("Clicked");
}

export default Button;
