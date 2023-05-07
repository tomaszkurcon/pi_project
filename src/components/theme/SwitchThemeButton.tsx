import { Switch, useMantineColorScheme, useMantineTheme } from "@mantine/core";
import { BsFillMoonFill, BsFillSunFill } from "react-icons/bs";
const SwitchThemeButton = () => {
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
      sx={{ position: "fixed", right: "30px", top: "30px" }}
    />
  );
};

export default SwitchThemeButton;
