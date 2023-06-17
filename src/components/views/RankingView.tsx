import { Table } from "@mantine/core";
import { useAuthContext } from "../../api/api_hooks/useAuthContext";
import { useGetFetch } from "../../api/api_hooks/useGetFetch";

import { createStringFromTime } from "../utils/createStringFromTime";
import moment from "moment";
import QueryResults from "../templates/QueryResults";
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
  const { user } = useAuthContext();
  const { data, ...queryState } = useGetFetch<TAttempts>("getAttempts", user);

  return (
    <QueryResults<TAttempts> data={data} {...queryState}>
      <Table striped highlightOnHover>
        <thead>
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
            <tr key={attempt._id}>
              <td>{attempt.email}</td>
              <td>{attempt.enteredDigits}</td>
              <td>{attempt.mistakes}</td>
              <td>{createStringFromTime(attempt.time)}</td>
              <td>{moment(attempt.createdAt).format("HH:mm DD-MM-YYYY")}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </QueryResults>
  );
};

export default RankingView;
