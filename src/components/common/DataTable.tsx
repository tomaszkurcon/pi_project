import {
    Avatar,
    Badge,
    Box,
    Card,
    Flex,
    Table,
    Text,
    Title,
    createStyles,
    rem,
    useMantineTheme,
  } from "@mantine/core";
  import { useAuthContext } from "../../api/api_hooks/useAuthContext";
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
  const DataTable = (data:TAttempts) => {
    const { classes } = useStyles();

    return (
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
    );
  };
  
  export default DataTable;
  