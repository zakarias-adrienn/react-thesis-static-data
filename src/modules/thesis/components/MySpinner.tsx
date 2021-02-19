import React from "react";
import { Stack } from "office-ui-fabric-react/lib/Stack";
import { Spinner, SpinnerSize } from "office-ui-fabric-react/lib/Spinner";
import { SharedColors } from "@fluentui/theme";

interface Props {
  label: string;
}

const MySpinner = (props: Props) => {
  return (
    <Stack>
      <Spinner label={props.label} size={SpinnerSize.large} style={{ color: SharedColors.red20 }} />
    </Stack>
  );
};

export default MySpinner;
