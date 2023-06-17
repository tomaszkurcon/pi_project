import { Switch, SwitchProps, useMantineColorScheme, useMantineTheme } from "@mantine/core";
import { BsFillMoonFill, BsFillSunFill } from "react-icons/bs";
const SwitchThemeButton = (props?:SwitchProps) => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const theme = useMantineTheme();
  const dark = colorScheme === "dark";

  return (
    <Switch
      size="md"
      color={dark ? "gray" : theme.colors.dark[0]}
      onLabel={<BsFillSunFill size="1.1rem" color="yellow" />}
      offLabel={<BsFillMoonFill size="1.1rem" />}
      onClick={() => toggleColorScheme()}
      {...props}
    />
  );
};

export default SwitchThemeButton;
