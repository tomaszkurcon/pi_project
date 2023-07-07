//MY OWN DIGIT KEYBOARD MAYBE TO USE IN FUTURE
import { Kbd, SimpleGrid } from "@mantine/core";
import { IconBackspaceFilled } from "@tabler/icons-react";

type MobileKeyboardProps = {
  onChange: (ev: string, index: number) => void;
};
const MobileKeyboard = ({ onChange }: MobileKeyboardProps) => {
  const digits = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
  return (
    <SimpleGrid cols={3} p={12} mt={10}>
      {digits.map((val, index) => (
        <Kbd key={index} size="xl" onClick={() => onChange(val, index)}>
          {val}
        </Kbd>
      ))}
      <Kbd size="xl">0</Kbd>
      <Kbd size="xl">0</Kbd>
      <Kbd
        size="xl"
        c="red"
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
        onClick={() => {}}
      >
        <IconBackspaceFilled size={31} />
      </Kbd>
    </SimpleGrid>
  );
};

export default MobileKeyboard;
