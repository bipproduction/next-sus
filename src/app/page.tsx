'use client'
import { Button, Container, Stack } from "@mantine/core";
import { useLocalStorage, useShallowEffect } from "@mantine/hooks";
import Link from "next/link";
import { useEffect } from "react";

export default function Home() {
  const [listApp, setListApp] = useLocalStorage<Record<string, any>[]>({
    key: "listApp",
    defaultValue: [],
  })

  useShallowEffect(() => {
    loadListApp()
  }, [])


  async function loadListApp() {
    const res = await fetch("/api/list-app");
    if (res.ok) {
      const jsonData = await res.json()
      setListApp(jsonData);
    }
  }

  return (
    <Container maw={500} mx="auto">
      <Stack h={"100vh"} align="center" justify="center">
        {listApp.map((app, index) => (
          <Link href={"/module/" + app.id} key={index}>
            <Button variant="outline" w={200} key={index}>{app.name}</Button>
          </Link>
        ))}
      </Stack>
    </Container>
  );
}
