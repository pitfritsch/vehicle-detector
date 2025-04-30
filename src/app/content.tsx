"use client";
import { FileSelector } from "@/components/FileSelector";
import { Center } from "@mantine/core";
import { useState } from "react";

export function HomePage() {
  const [file, setFile] = useState<File | null>(null);

  return (
    <Center>
      <FileSelector file={file} onSelectFile={setFile} />
    </Center>
  );
}
