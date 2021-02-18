import * as React from "react";
import { PrimaryButton, Stack, IStackTokens } from "office-ui-fabric-react";
import { IIconProps } from "office-ui-fabric-react";

export interface IButtonExampleProps {
  disabled?: boolean;
  checked?: boolean;
  onClick: Function;
}

const stackTokens: IStackTokens = { childrenGap: 40 };

const searchIcon: IIconProps = { iconName: "SearchBookmark" };

const MySubmitButton: React.FunctionComponent<IButtonExampleProps> = (props) => {
  const { disabled, checked } = props;

  return (
    <Stack horizontal tokens={stackTokens}>
      <PrimaryButton
        iconProps={searchIcon}
        text="Keresés"
        onClick={() => props.onClick()}
        type="submit"
        allowDisabledFocus
        disabled={disabled}
        checked={checked}
      />
    </Stack>
  );
};

export default MySubmitButton;
