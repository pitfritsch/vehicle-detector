import {
  Button,
  Center,
  FileInput,
  Flex,
  Image,
  Stack,
  Title,
} from "@mantine/core";
import { useEffect, useState } from "react";

export function HomePage() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageBlob, setImageBlob] = useState<string>();

  useEffect(() => {
    if (!imageFile) return setImageBlob(undefined);
    setImageBlob(URL.createObjectURL(imageFile));
  }, [imageFile]);

  return (
    <Center h={"100dvh"} w={"100dvw"}>
      <Stack>
        <Title>Welcome!</Title>
        <FileInput
          label="Select the vehicle image"
          accept="image/png,image/jpg,image/jpeg"
          value={imageFile}
          onChange={setImageFile}
        />
        <Image radius="md" src={imageBlob} mah={"70vh"} />
      </Stack>
    </Center>
  );
}
