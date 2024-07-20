'use client'
import { ActionIcon, Button, Flex, NavLink, Stack, Text, TextInput, Title } from "@mantine/core";
import { useLocalStorage, useShallowEffect } from "@mantine/hooks";
import _ from "lodash";
import { useState } from "react";
import { MdDelete } from "react-icons/md";

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

    return <Stack>
        <Flex>
            <Stack gap={0} h={"100vh"} w={300} style={{
                backgroundColor: "lightgray"
            }}>
                {listApp.map((app, index) => (
                    <NavLink key={index} label={app.name} onClick={() => setCurrentApp(app.id)} />
                ))}
            </Stack>
            <Stack p={"md"} h={"100vh"}>
                {(() => {
                    const App = listApp.find((app) => app.id === currentApp)!.view;
                    return <App />
                })()}
            </Stack>
        </Flex>
    </Stack>;
}

function ListModule() {
    const [listApp, setListApp] = useState<Record<string, any>[]>([])

    useShallowEffect(() => {
        loadApp()
    }, [])
    async function loadApp() {
        const res = await fetch("/api/list-app")

        if (res.ok) {
            setListApp(await res.json())
        }
    }

    async function onDelete(id: string) {
        if (!confirm) return
        const res = await fetch("/api/delete-app", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id }),
        })

        if (res.ok) {
            loadApp()
        }
    }
    return <Stack gap={"sm"}>
        <Title>List App</Title>
        <Stack
            p={"md"}
            gap={"md"}
            style={{
                backgroundColor: "lightgray"
            }}>
            {listApp.map((app, index) => (
                <Flex key={index} gap={"md"} >
                    <ActionIcon onClick={() => onDelete(app.id)} radius={100}>
                        <MdDelete />
                    </ActionIcon>
                    <Text>{app.name}</Text>
                </Flex>
            ))}
        </Stack>
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
    return <Stack gap={"md"}>
        <TextInput value={form.name} placeholder="Module name" onChange={(value) => setForm({ ...form, name: value.currentTarget.value })} />
        <TextInput value={form.url} placeholder="Module url" onChange={(value) => setForm({ ...form, url: value.currentTarget.value })} />
        <Button onClick={onSave} >Save</Button>
    </Stack>
}