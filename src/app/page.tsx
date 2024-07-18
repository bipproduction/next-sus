import { listApp } from "@/list/listApp";
import { Button, Container, Stack } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import Image from "next/image";
import Link from "next/link";



export default function Home() {

  return (
    <Container maw={500} mx="auto">
      <Stack h={"100vh"} align="center" justify="center">
        {listApp.map((app, index) => (
          <Link href={"/" + app.id} key={index}>
            <Button variant="outline" w={200} key={index}>{app.name}</Button>
          </Link>
        ))}
      </Stack>
    </Container>
  );
}
