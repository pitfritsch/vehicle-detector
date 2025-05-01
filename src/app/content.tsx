"use client";
import { FileSelector } from "@/components/FileSelector";
import { Button, Center, Grid, Stack, Text } from "@mantine/core";
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
    <Center>
      <Stack>
        <FileSelector file={file} onSelectFile={setFile} />
        <Button onClick={fetchBlob} loading={isLoading}>
          Which vehicle is this?
        </Button>
        {response && (
          <Grid>
            <Grid.Col span={6}>Brand</Grid.Col>
            <Grid.Col span={6}>{response.brand}</Grid.Col>
            <Grid.Col span={6}>Model</Grid.Col>
            <Grid.Col span={6}>{response.model}</Grid.Col>
            <Grid.Col span={6}>Year</Grid.Col>
            <Grid.Col span={6}>{response.year}</Grid.Col>
            <Grid.Col span={6}>Color</Grid.Col>
            <Grid.Col span={6}>{response.color}</Grid.Col>
          </Grid>
        )}
      </Stack>
    </Center>
  );
}
