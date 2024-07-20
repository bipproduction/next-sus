import prisma from "@/bin/prisma";

export async function POST(request: Request) {
  const body = await request.json();
  const create = await prisma.moduleApp.create({
    data: {
      name: body.name,
      url: body.url,
    },
  });
  
  return new Response(JSON.stringify(create), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
