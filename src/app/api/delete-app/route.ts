import prisma from "@/bin/prisma";

export async function POST(request: Request) {
  const body = await request.json();
  const deleteApp = await prisma.moduleApp.delete({
    where: {
      id: body.id,
    },
  });
  return new Response(JSON.stringify(deleteApp), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
