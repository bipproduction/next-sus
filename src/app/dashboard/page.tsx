'use client'
import { ActionIcon, Anchor, Box, Button, Flex, Group, Loader, LoadingOverlay, NavLink, Skeleton, Stack, Text, TextInput, Title, UnstyledButton } from "@mantine/core";
import { useLocalStorage, useShallowEffect } from "@mantine/hooks";
import _ from "lodash";
import { useState } from "react";
import { MdDelete, MdHome } from "react-icons/md";

const listApp = [
    {
        id: "1",
        name: "list app",
        view: ListModule
    },
    {
        id: "2",
        name: "create app",
        view: CreateModule
    },
]

export default function Page() {
    const [currentApp, setCurrentApp] = useLocalStorage({
        key: "currentApp",
        defaultValue: listApp[0].id,
    });

    return <Stack h={"100vh"} gap={"0"}>
        <Flex bg={"dark"} c={"white"} p={"md"} gap={"md"}>
            <ActionIcon variant="subtle" onClick={() => window.location.href = "/"}>
                <MdHome size={"1.5rem"} />
            </ActionIcon>
            <Stack>
                <Title order={3}>Dashboard</Title>
                <Flex gap={"lg"} hiddenFrom="md">
                    {listApp.map((app, index) => (
                        <Anchor key={index} onClick={() => setCurrentApp(app.id)} >{app.name}</Anchor>
                    ))}
                </Flex>
            </Stack>
        </Flex>
        <Flex flex={1}>
            <Stack visibleFrom="md" gap={0} w={300} bg={"dark"} c={"white"} p={"md"}>
                {listApp.map((app, index) => (
                    <Anchor variant="text" key={index} onClick={() => setCurrentApp(app.id)} >{app.name}</Anchor>
                ))}
            </Stack>
            <Box pos={"relative"} flex={1} style={{
                backgroundColor: "lightslategray"
            }}>
                <CurrentModule listApp={listApp} currentApp={currentApp} />
            </Box>
        </Flex>
    </Stack>;
}

function CurrentModule({ listApp, currentApp }: { listApp: Record<string, any>[], currentApp: string }) {
    const app = listApp.find((app) => app.id === currentApp);
    if (!app) return <div>App Not found</div>
    return <app.view />;
}

function ListModule() {
    const [listApp, setListApp] = useState<Record<string, any>[]>([])
    const [loading, setLoading] = useState(false)
    const [loadingList, setLoadingList] = useState(false)

    useShallowEffect(() => {
        loadApp()
    }, [])
    async function loadApp() {
        setLoadingList(true)
        const res = await fetch("/api/list-app")

        if (res.ok) {
            setListApp(await res.json())
        }
        setLoadingList(false)
    }

    async function onDelete(id: string) {
        if (confirm("Are you sure?")) {
            setLoading(true)
            const res = await fetch("/api/delete-app", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id }),
            })

            if (res.ok) {
                alert("Deleted")
                loadApp()

            }

            setLoading(false)
        }

    }


    return <Stack gap={"sm"} p={"md"}>
        <Title order={3}>List App</Title>
        <Stack
            pos={"relative"}
            p={"md"}
            gap={"md"}>
            {listApp.map((app, index) => (
                <Stack key={index} gap={"0"} >
                    <Text fw={"bold"}>{app.name}</Text>
                    <Text c={"dark"} >{app.url}</Text>
                    <Group>
                        <Anchor c={"white"} onClick={() => onDelete(app.id)}>delete</Anchor>
                    </Group>
                </Stack>
            ))}
            <Loader color="white" style={{
                display: loadingList ? "block" : "none"
            }} />
        </Stack>
        <LoadingOverlay visible={loading} />
    </Stack>
}

function CreateModule() {

    const [form, setForm] = useState({
        name: "",
        url: ""
    })

    async function onSave() {
        if (_.values(form).includes("")) return alert("Please fill all fields")
        const res = await fetch("/api/create-app", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(form),
        })

        if (res.ok) {
            return alert("Success")
        }

    }
    return <Flex>
        <Stack gap={"md"} p={"md"}>
            <Title order={3}>Create App</Title>
            <TextInput value={form.name} placeholder="Module name" onChange={(value) => setForm({ ...form, name: value.currentTarget.value })} />
            <TextInput value={form.url} placeholder="Module url" onChange={(value) => setForm({ ...form, url: value.currentTarget.value })} />
            <Button onClick={onSave} >Save</Button>
        </Stack>
    </Flex>
}