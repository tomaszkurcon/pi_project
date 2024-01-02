import { LoadingOverlay } from "@mantine/core";
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
  isRefetching,
}: QueryResultsProps & Partial<TQueryState<T>>) => {
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
        <ApiErrors error_message={error} />
      ) : Array.isArray(data) && data.length === 0 ? (
        <div>No results</div>
      ) : (
        <>
          {isRefetching && (
            <LoadingOverlay
              loaderProps={{ size: "xl", variant: "dots" }}
              overlayOpacity={0.3}
              overlayColor="#c5c5c5"
              visible
              zIndex={1000}
              sx={{ position: "fixed" }}
            />
          )}

          {children}
        </>
      )}
    </>
  );
};

export default QueryResults;
