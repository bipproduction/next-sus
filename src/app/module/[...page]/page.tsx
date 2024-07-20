'use client'
import { ActionIcon, Flex, Group, Stack, Text } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import { MdArrowBackIos } from "react-icons/md";

export default function Page({ params }: { params: { page: string[] } }) {
    const [listApp, setListApp] = useLocalStorage<Record<string, any>[]>({
        key: "listApp",
        defaultValue: [],
    })
    
    const app = listApp.find((app) => app.id === params.page.join("/"));

    function onBack() {
        window.location.href = "/";
    }

    if (!app) return <div>Not found</div>;
    return (
        <Stack gap={"md"} align="center">
            <Group
                p={"md"}
                pos={"absolute"}
                bottom={0}
                left={0}
                style={{
                    zIndex: 999,
                }}>
                <ActionIcon onClick={onBack} radius={100}>
                    <MdArrowBackIos />
                </ActionIcon>
            </Group>
            <iframe
                src={app?.url}
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Example"
            ></iframe>
        </Stack>
    );
}