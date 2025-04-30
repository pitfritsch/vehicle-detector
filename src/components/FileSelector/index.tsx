"use client";
import { Stack, FileInput, Image } from "@mantine/core";
import { useState, useEffect } from "react";

interface Props {
  file: File | null;
  onSelectFile: (file: File | null) => void;
}

export function FileSelector({ file, onSelectFile }: Props) {
  const [imageBlob, setImageBlob] = useState<string>();

  useEffect(() => {
    onSelectFile(file);
    if (!file) return setImageBlob(undefined);
    setImageBlob(URL.createObjectURL(file));
  }, [file]);

  return (
    <Stack>
      <FileInput
        label="Select the vehicle image"
        accept="image/png,image/jpg,image/jpeg"
        value={file}
        onChange={onSelectFile}
      />
      <Image radius="md" src={imageBlob} mah={"70vh"} />
    </Stack>
  );
}
