import {
  Avatar,
  Badge,
  Box,
  Card,
  Flex,
  Text,
  Title,
  createStyles,
  rem,
  useMantineTheme,
} from "@mantine/core";
import { useGetFetch } from "../../api/api_hooks/useGetFetch";

import { createStringFromTime } from "../utils/createStringFromTime";
import moment from "moment";
import QueryResults from "../templates/QueryResults";
import { useMediaQuery } from "@mantine/hooks";

const useStyles = createStyles((theme) => ({
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  thead: {
    textAlign: "left",
  },
  row: {
    "& > *": {
      paddingLeft: 10,
      paddingTop: 5,
      paddingBottom: 5,
    },
    borderTop: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[4]
    }`,
    ":nth-child(odd)": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[5]
          : theme.colors.gray[1],
    },
    ":hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[2],
    },
  },
  container: {
    display: "flex",
    flexDirection: "column",
    justifyItems: "space-between",
    gap: rem(20),
  },
}));
type TAttempts = Array<{
  _id: string;
  enteredDigits: number;
  mistakes: number;
  time: number;
  createdAt: string;
  updatedAt: string;
  user_id: string;
  email: string;
}>;
const RankingView = () => {
  const { data, ...queryState } = useGetFetch<TAttempts>("dashboard/getAttempts");
  const { classes } = useStyles();
  const theme = useMantineTheme();
  const matches = useMediaQuery(`(min-width:${theme.breakpoints.sm})`);
  const avatar = (
    <Avatar
      alt="Avatar for badge"
      radius="xl"
      size={"md"}
      mr={5}
      src="https://images.pexels.com/photos/16628785/pexels-photo-16628785/free-photo-of-fashion-love-woman-dark.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    />
  );
  return (
    <QueryResults<TAttempts> data={data} {...queryState}>
      {matches ? (
        <table className={classes.table}>
          <thead className={classes.thead}>
            <tr>
              <th>User name</th>
              <th>Entered digits</th>
              <th>Mistakes</th>
              <th>Time</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((attempt) => (
              <tr key={attempt._id} className={classes.row}>
                <td>{attempt.email}</td>
                <td>{attempt.enteredDigits}</td>
                <td>{attempt.mistakes}</td>
                <td>{createStringFromTime(attempt.time)}</td>
                <td>{moment(attempt.createdAt).format("HH:mm DD-MM-YYYY")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <>
          <Title order={2} mb={10}>
            Ranking
          </Title>
          <div className={classes.container}>
            {data?.map((attempt) => (
              <Card key={attempt._id} shadow="sm" padding="lg" radius="md">
                <Badge
                  pl={0}
                  size="xl"
                  radius="lg"
                  leftSection={avatar}
                  styles={{ root: { overflow: "visible" } }}
                >
                  {attempt.email}
                </Badge>

                <Flex align="center" gap={6} mt={4} mb={6}>
                  <Text fw={700} size="lg">
                    Entered Digits:
                  </Text>
                  <Badge radius="sm" size="lg" p={4} color="teal">
                    {attempt.enteredDigits}
                  </Badge>
                </Flex>
                <Flex align="center" gap={6} mb={6}>
                  <Text fw={700} size="lg">
                    Mistakes:
                  </Text>
                  <Badge color="red" radius="sm" size="lg" p={4}>
                    {attempt.mistakes}
                  </Badge>
                </Flex>
                <Flex align="center" gap={6}>
                  <Text fw={700} size="lg">
                    Time:
                  </Text>
                  <Badge color="yellow" radius="sm" size="lg" p={4}>
                    {createStringFromTime(attempt.time)}
                  </Badge>
                </Flex>
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                  <Text color="dimmed">
                    {moment(attempt.createdAt).format("HH:mm DD-MM-YYYY")}
                  </Text>
                </Box>
              </Card>
            ))}
          </div>
        </>
      )}
    </QueryResults>
  );
};

export default RankingView;
