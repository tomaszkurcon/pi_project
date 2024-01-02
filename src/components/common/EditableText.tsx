import {
  ActionIcon,
  Button,
  CloseButton,
  Text,
  TextInput,
  TextProps,
} from "@mantine/core";
import { IconPencil } from "@tabler/icons-react";
import React, { useState } from "react";

type TEditableTextProps = {
  text?: string;
  onEdit: (val: string) => Promise<boolean>;
} & TextProps;
const EditableText = ({ text, onEdit, ...props }: TEditableTextProps) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [value, setValue] = useState<string>(text || "");
  const changeValueHandler = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setValue(ev.target.value);
  };
  const onSaveHandler = async () => {
    const succesfullyEdited = await onEdit(value);
    succesfullyEdited && setIsEditing(false)

  };

  return (
    <>
      {!isEditing ? (
        value ? (
          <Text {...props}>{value}</Text>
        ) : (
          <Text {...props} color="dimmed">
            -
          </Text>
        )
      ) : (
        <>
          <TextInput
            w={"60%"}
            defaultValue={value}
            autoFocus
            mr={5}
            onChange={changeValueHandler}
          />
          <Button variant="subtle" onClick={onSaveHandler}>
            Save
          </Button>
        </>
      )}

      <ActionIcon
        onClick={() => {
          setIsEditing((prev) => !prev);
          setValue(text || "");
        }}
        ml={8}
      >
        {!isEditing ? <IconPencil stroke={1} /> : <CloseButton />}
      </ActionIcon>
    </>
  );
};

export default EditableText;
