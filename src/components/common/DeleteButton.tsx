import { Button, LoadingOverlay } from "@mantine/core";
import { usePostFetch } from "../../api/api_hooks/usePostFetch";

type TDeleteButton = {
  url: string;
  type: string;
  onSuccess?: () => void;
};

const DeleteButton = ({ url, type, onSuccess }: TDeleteButton) => {
  const { loading, mutate } = usePostFetch(
    url,
    {
      onSuccess: () => {
        onSuccess && onSuccess();
      },
    },
    "DELETE"
  );
  return (
    <>
      {loading && (
        <LoadingOverlay
          loaderProps={{ size: "xl", variant: "dots" }}
          overlayOpacity={0.3}
          overlayColor="#c5c5c5"
          visible
          zIndex={1000}
        />
      )}
      <Button
        color="red"
        onClick={() => {
          mutate({ type: type });
        }}
      >
        Delete
      </Button>
    </>
  );
};

export default DeleteButton;
