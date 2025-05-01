"use client";
import {
  Button,
  Card,
  Center,
  Group,
  Image,
  Skeleton,
  Stack,
  Text,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { Vehicle } from "./api/route";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { IconPhoto, IconUpload, IconX } from "@tabler/icons-react";

export function HomePage() {
  const [file, setFile] = useState<File | null>(null);
  const [blob, setBlob] = useState<Blob | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [response, setResponse] = useState<Vehicle>();
  const [imageUrl, setImageUrl] = useState<string>();

  useEffect(() => {
    if (!file) return setImageUrl(undefined);
    setImageUrl(URL.createObjectURL(file));
  }, [file]);

  useEffect(() => {
    if (file) {
      setBlob(new Blob([file], { type: file.type }));
    } else {
      setBlob(null);
    }
  }, [file]);

  async function fetchBlob() {
    setResponse(undefined);
    setIsLoading(true);
    try {
      const response = await fetch("/api", {
        method: "POST",
        body: blob,
        headers: {
          "Content-Type": "image/jpeg",
        },
      });
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const vehicle = (await response.json()) as Vehicle;
      setResponse(vehicle);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Center p={"lg"}>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Card.Section h="50vh">
          <Dropzone
            onDrop={([file]) => setFile(file)}
            onReject={(files) => console.log("rejected files", files)}
            h="100%"
            p={0}
            accept={IMAGE_MIME_TYPE}
            styles={{
              inner: {
                height: "100%",
              },
            }}
          >
            {file ? (
              <Image src={imageUrl} h="100%" />
            ) : (
              <Group
                justify="center"
                align="center"
                h="100%"
                gap="xl"
                mih={220}
                style={{ pointerEvents: "none" }}
              >
                <Dropzone.Accept>
                  <IconUpload
                    size={52}
                    color="var(--mantine-color-blue-6)"
                    stroke={1.5}
                  />
                </Dropzone.Accept>
                <Dropzone.Reject>
                  <IconX
                    size={52}
                    color="var(--mantine-color-red-6)"
                    stroke={1.5}
                  />
                </Dropzone.Reject>
                <Dropzone.Idle>
                  <IconPhoto
                    size={52}
                    color="var(--mantine-color-dimmed)"
                    stroke={1.5}
                  />
                </Dropzone.Idle>

                <div>
                  <Text size="xl" inline>
                    Drag images here or click to select files
                  </Text>
                  <Text size="sm" c="dimmed" inline mt={7}>
                    Attach as many files as you like, each file should not
                    exceed 5mb
                  </Text>
                </div>
              </Group>
            )}
          </Dropzone>
        </Card.Section>

        <Stack p="md">
          <Skeleton height={25} hidden={!isLoading} />
          {!isLoading && (
            <Group>
              <Text fw={500} flex={1}>
                Brand
              </Text>
              <Text flex={1}>{response?.brand}</Text>
            </Group>
          )}

          <Skeleton height={25} hidden={!isLoading} />
          {!isLoading && (
            <Group>
              <Text fw={500} flex={1}>
                Model
              </Text>
              <Text flex={1}>{response?.model}</Text>
            </Group>
          )}

          <Skeleton height={25} hidden={!isLoading} />
          {!isLoading && (
            <Group>
              <Text fw={500} flex={1}>
                Year
              </Text>
              <Text flex={1}>{response?.year}</Text>
            </Group>
          )}

          <Skeleton height={25} hidden={!isLoading} />
          {!isLoading && (
            <Group>
              <Text fw={500} flex={1}>
                Color
              </Text>
              <Text flex={1}>{response?.color}</Text>
            </Group>
          )}
        </Stack>

        <Button
          color="blue"
          fullWidth
          mt="md"
          radius="md"
          onClick={fetchBlob}
          loading={isLoading}
        >
          Which vehicle is this?
        </Button>
      </Card>
    </Center>
  );
}
