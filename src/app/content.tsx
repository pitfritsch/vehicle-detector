"use client";
import { FileSelector } from "@/components/FileSelector";
import { Button, Center, Group, Stack, Text } from "@mantine/core";
import { useEffect, useState } from "react";
import { Vehicle } from "./api/route";

export function HomePage() {
  const [file, setFile] = useState<File | null>(null);
  const [blob, setBlob] = useState<Blob | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [response, setResponse] = useState<Vehicle>();

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
      <Stack>
        <FileSelector file={file} onSelectFile={setFile} />
        <Button onClick={fetchBlob} loading={isLoading}>
          Which vehicle is this?
        </Button>
        {response && (
          <Stack bg="gray" p="md">
            <Group>
              <Text flex={1}>Brand</Text>
              <Text flex={1}>{response.brand}</Text>
            </Group>

            <Group>
              <Text flex={1}>Model</Text>
              <Text flex={1}>{response.model}</Text>
            </Group>
            <Group>
              <Text flex={1}>Year</Text>
              <Text flex={1}>{response.year}</Text>
            </Group>
            <Group>
              <Text flex={1}>Color</Text>
              <Text flex={1}>{response.color}</Text>
            </Group>
          </Stack>
        )}
      </Stack>
    </Center>
  );
}
