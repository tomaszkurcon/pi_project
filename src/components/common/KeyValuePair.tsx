import { Flex, Text } from "@mantine/core";

import EditableText from "./EditableText";

export type TKeyValue = {
  name: string;
  value?: string;
};
type TKeyValuePairProps = {
  label?: string;
  name: string;
  value?: string;
  onEdit?: (value: TKeyValue) => Promise<boolean>;
};
const KeyValuePair = ({ label, name, value, onEdit }: TKeyValuePairProps) => {

  return (
    <Flex justify={"space-between"} align={"center"}>
      <Text w={"40%"} weight={600}>
        {label}
      </Text>
      {onEdit ? (
        <EditableText
          text={value}
          sx={{ flexGrow: 2 }}
          w={"60%"}
          fs="italic"
          onEdit={(value) => onEdit({ name: name, value: value })}
        />
      ) : (
        <Text w={"60%"} fs="italic">
          {value}
        </Text>
      )}
    </Flex>
  );
};

export default KeyValuePair;
