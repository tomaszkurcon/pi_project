import { Dispatch, SetStateAction, useState } from "react";
import {
  Group,
  Text,
  useMantineTheme,
  rem,
  Button,
  Flex,
  LoadingOverlay,
} from "@mantine/core";
import { IconUpload, IconPhoto, IconX } from "@tabler/icons-react";
import {
  Dropzone,
  DropzoneProps,
  FileWithPath,
  IMAGE_MIME_TYPE,
} from "@mantine/dropzone";
import { convertToBase64 } from "../utils/convertToBase64";
import { usePostFetch } from "../../api/api_hooks/usePostFetch";
import ImageCropper from "./ImageCropper";
import DeleteButton from "./DeleteButton";

type TDropzoneMantine = {
  type: string;
  closeModal: Dispatch<SetStateAction<string>>;
  refetch: () => void;
  recentImagePreview?: string;
} & Partial<DropzoneProps>;
const DropzoneMantine = ({
  type,
  closeModal,
  refetch,
  recentImagePreview,
  ...props
}: TDropzoneMantine) => {
  const [imagePreview, setImagePreview] = useState<string>(
    recentImagePreview || ""
  );
  const [base64, setBase64] = useState<string | ArrayBuffer | undefined>("");

  const { loading, mutate } = usePostFetch(
    "files/upload",
    {
      onSuccess: () => {
        closeModal("");
      },
    },
    "PUT"
  );

  const theme = useMantineTheme();
  const aspectRatio = type == "backgroundImage" ? 6 : 1;
  const handleFileUpload = async (files: FileWithPath[]) => {
    const file = files[0];
    const base64 = await convertToBase64(file);
    base64 && setBase64(base64);
    typeof base64 === "string" && setImagePreview(base64);
  };
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
      {imagePreview ? (
        <>
          <ImageCropper
            src={imagePreview}
            setBase64={setBase64}
            aspectRatio={aspectRatio}
          />
          <Flex
            gap={30}
            justify="center"
            mt={10}
            direction={{ base: "column", sm: "row" }}
          >
            <Button
              color="teal"
              onClick={() => {
                mutate({ base64: base64, type: type }, refetch);
              }}
            >
              Accept
            </Button>
            <DeleteButton
              url="files/delete"
              type={type}
              onSuccess={() => {
                closeModal("");
                refetch();
              }}
            />
            <Button
              onClick={() => {
                setImagePreview("");
              }}
            >
              Select another image
            </Button>
          </Flex>
        </>
      ) : (
        <Dropzone
          onDrop={(files) => handleFileUpload(files)}
          onReject={(files) => console.log("rejected files", files)}
          maxSize={3 * 1024 ** 2}
          accept={IMAGE_MIME_TYPE}
          loading={loading}
          {...props}
        >
          <Group
            position="center"
            spacing="xl"
            style={{ minHeight: rem(220), pointerEvents: "none" }}
          >
            <Dropzone.Accept>
              <IconUpload
                size="3.2rem"
                stroke={1.5}
                color={
                  theme.colors[theme.primaryColor][
                    theme.colorScheme === "dark" ? 4 : 6
                  ]
                }
              />
            </Dropzone.Accept>
            <Dropzone.Reject>
              <IconX
                size="3.2rem"
                stroke={1.5}
                color={theme.colors.red[theme.colorScheme === "dark" ? 4 : 6]}
              />
            </Dropzone.Reject>
            <Dropzone.Idle>
              <IconPhoto size="3.2rem" stroke={1.5} />
            </Dropzone.Idle>

            <div>
              <Text size="xl" inline>
                Drag images here or click to select files
              </Text>
              <Text size="sm" color="dimmed" inline mt={7}>
                Attach as many files as you like, each file should not exceed
                5mb
              </Text>
            </div>
          </Group>
        </Dropzone>
      )}
    </>
  );
};

export default DropzoneMantine;
