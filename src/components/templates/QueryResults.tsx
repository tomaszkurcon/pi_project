import {  LoadingOverlay } from "@mantine/core";
import { TQueryState } from "../../api/api_hooks/useGetFetch";
import ApiErrors from "../common/ApiErrors";
type QueryResultsProps = {
  children?: React.ReactNode;
};
const QueryResults = <T,>({
  children,
  loading,
  error,
  data,
}: QueryResultsProps & TQueryState<T>) => {
  return (
    <>
      {loading ? (
        <LoadingOverlay
          loaderProps={{ size: "xl", variant: "dots" }}
          overlayOpacity={0.3}
          overlayColor="#c5c5c5"
          visible
          zIndex={1000}
        />
      ) : error ? (
        <ApiErrors />
      ) : Array.isArray(data) && data.length == 0 ? (
        <div>No results</div>
      ) : (
        children
      )}
    </>
  );
};

export default QueryResults;