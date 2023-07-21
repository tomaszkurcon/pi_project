import { Group, Text, useMantineTheme, rem } from "@mantine/core";
import { IconUpload, IconPhoto, IconX } from "@tabler/icons-react";
import { Dropzone, DropzoneProps, FileWithPath, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { convertToBase64 } from "../utils/convertToBase64";
import { usePostFetch } from "../../api/api_hooks/usePostFetch";
const DropzoneMantine = (props: Partial<DropzoneProps>) => {
  const { loading, mutate } = usePostFetch(
    "files/upload",
  );
  const theme = useMantineTheme();
  const handleFileUpload = async (files:FileWithPath[]) => {
    const file = files[0]
    const base64 = await convertToBase64(file)
    mutate(base64)
  }
  return (
    <Dropzone
    onDrop={(files) => handleFileUpload(files)}
    onReject={(files) => console.log("rejected files", files)}
    maxSize={3 * 1024 ** 2}
    accept={IMAGE_MIME_TYPE}
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
          Attach as many files as you like, each file should not exceed 5mb
        </Text>
      </div>
    </Group>
  </Dropzone>
  )
 
};

export default DropzoneMantine;
