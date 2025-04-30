"use client";
import { FileSelector } from "@/components/FileSelector";
import { Button, Center, Stack, Text } from "@mantine/core";
import { useEffect, useState } from "react";

export function HomePage() {
  const [file, setFile] = useState<File | null>(null);
  const [blob, setBlob] = useState<Blob | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [response, setResponse] = useState<string>("");

  useEffect(() => {
    if (file) {
      setBlob(new Blob([file], { type: file.type }));
    } else {
      setBlob(null);
    }
  }, [file]);

  async function fetchBlob() {
    setResponse("");
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

      const json = await response.json();
      setResponse(json.response);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Center>
      <Stack>
        <FileSelector file={file} onSelectFile={setFile} />
        <Button onClick={fetchBlob} loading={isLoading}>
          What is this image
        </Button>
        <Text maw={"1000px"} ta={"center"}>
          {response}
        </Text>
      </Stack>
    </Center>
  );
}
