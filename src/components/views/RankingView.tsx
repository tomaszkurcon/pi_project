import { useGetFetch } from "../../api/api_hooks/useGetFetch";

type record = {
  test: number;
};
const RankingView = () => {
  const { data, loading } = useGetFetch<record>("test");
  console.log(data, loading);

  return <div>{loading ? "loading" : "no loading"}</div>;
};

export default RankingView;
