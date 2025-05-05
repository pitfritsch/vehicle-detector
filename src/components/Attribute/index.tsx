import { Skeleton, Group, Text } from "@mantine/core";

interface Props {
  isLoading: boolean;
  attribute: string;
  value: string | number;
}

export default function Attribute({ isLoading, attribute, value }: Props) {
  if (isLoading) {
    return <Skeleton height={25} />;
  }

  return (
    <Group>
      <Text fw={500} flex={1} tt={"capitalize"}>
        {attribute}
      </Text>
      <Text flex={1}>{value}</Text>
    </Group>
  );
}
