import prisma from "@/bin/prisma";

export async function GET() {
  const listApp = await prisma.moduleApp.findMany({
    where: {
      isActive: true,
    },
  });
  return new Response(JSON.stringify(listApp), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
