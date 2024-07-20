import prisma from "@/bin/prisma";

export const listApp = [
  {
    id: "1",
    name: "hipmi",
    url: "https://hipmi.ravenstone.cloud",
    isDefault: true,
  },
  {
    id: "2",
    name: "sdm",
    url: "https://sdm.ravenstone.cloud",
  },
];

(async () => {
  for (const app of listApp) {
    await prisma.moduleApp.upsert({
      where: { id: app.id },
      create: app,
      update: app,
    });

    console.log("Created app: " + app.name);
  }
})().finally(async () => {
  await prisma.$disconnect();
});
