import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Create admin
  const passwordHash = await bcrypt.hash(
    process.env.ADMIN_PASSWORD || "Malinois2026!",
    12
  );

  await prisma.admin.upsert({
    where: { email: process.env.ADMIN_EMAIL || "admin@belgianmalinoisspecialbreed.be" },
    update: {},
    create: {
      email: process.env.ADMIN_EMAIL || "admin@belgianmalinoisspecialbreed.be",
      passwordHash,
      name: "Kennel Admin",
    },
  });

  // Clear existing for clean seed
  await prisma.certificate.deleteMany();
  await prisma.inquiry.deleteMany();
  await prisma.puppy.deleteMany();

  const puppies = [
    {
      name: "Atlas",
      slug: "atlas",
      sex: "Male",
      birthDate: new Date("2026-05-12"),
      color: "Fawn with black mask",
      price: 2200,
      status: "Available",
      litter: "Spring 2026 – “Valor” Litter",
      description:
        "Bold, confident male with strong drive and excellent structure. Shows early working aptitude while remaining biddable. Ideal for active homes or sport foundations.",
      sire: "Ch. Valor van de Special Breed (HD A, ED 0/0, DNA clear)",
      dam: "Astra van het Gouden Veld (HD B, ED 0/0, DNA clear)",
      sireHD: "A",
      sireED: "0/0",
      damHD: "B",
      damED: "0/0",
      dna: "Clear – Full panel",
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1587300003388-59208cc962cb?q=80&w=800",
        "https://images.unsplash.com/photo-1558788353-f76d92427f16?q=80&w=800",
      ]),
      deposit: 500,
      certificates: {
        create: [
          { name: "Sire Hip Score", type: "HD", fileUrl: "#" },
          { name: "Sire Elbow Score", type: "ED", fileUrl: "#" },
          { name: "Dam Hip Score", type: "HD", fileUrl: "#" },
          { name: "Dam Elbow Score", type: "ED", fileUrl: "#" },
          { name: "DNA Panel Results", type: "DNA", fileUrl: "#" },
        ],
      },
    },
    {
      name: "Nova",
      slug: "nova",
      sex: "Female",
      birthDate: new Date("2026-05-12"),
      color: "Mahogany with black mask",
      price: 2400,
      status: "Available",
      litter: "Spring 2026 – “Valor” Litter",
      description:
        "Elegant, highly intelligent female with balanced drive and soft expression. Exceptional focus and early socialization. Outstanding prospect for sport or serious companion work.",
      sire: "Ch. Valor van de Special Breed (HD A, ED 0/0, DNA clear)",
      dam: "Astra van het Gouden Veld (HD B, ED 0/0, DNA clear)",
      sireHD: "A",
      sireED: "0/0",
      damHD: "B",
      damED: "0/0",
      dna: "Clear – Full panel",
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?q=80&w=800",
        "https://images.unsplash.com/photo-1587300003388-59208cc962cb?q=80&w=800",
      ]),
      deposit: 500,
      certificates: {
        create: [
          { name: "Sire Hip Score", type: "HD", fileUrl: "#" },
          { name: "Sire Elbow Score", type: "ED", fileUrl: "#" },
          { name: "Dam Hip Score", type: "HD", fileUrl: "#" },
          { name: "Dam Elbow Score", type: "ED", fileUrl: "#" },
          { name: "DNA Panel Results", type: "DNA", fileUrl: "#" },
        ],
      },
    },
    {
      name: "Rex",
      slug: "rex",
      sex: "Male",
      birthDate: new Date("2026-05-12"),
      color: "Fawn",
      price: 2100,
      status: "Reserved",
      litter: "Spring 2026 – “Valor” Litter",
      description:
        "Powerful, athletic male with classic Malinois expression. Strong prey drive tempered by excellent handler focus. Reserved for a working home.",
      sire: "Ch. Valor van de Special Breed (HD A, ED 0/0, DNA clear)",
      dam: "Astra van het Gouden Veld (HD B, ED 0/0, DNA clear)",
      sireHD: "A",
      sireED: "0/0",
      damHD: "B",
      damED: "0/0",
      dna: "Clear – Full panel",
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1558788353-f76d92427f16?q=80&w=800",
      ]),
      deposit: 500,
      certificates: {
        create: [
          { name: "Sire Hip Score", type: "HD", fileUrl: "#" },
          { name: "Sire Elbow Score", type: "ED", fileUrl: "#" },
          { name: "Dam Hip Score", type: "HD", fileUrl: "#" },
          { name: "Dam Elbow Score", type: "ED", fileUrl: "#" },
          { name: "DNA Panel Results", type: "DNA", fileUrl: "#" },
        ],
      },
    },
    {
      name: "Luna",
      slug: "luna",
      sex: "Female",
      birthDate: new Date("2026-03-28"),
      color: "Fawn with black mask",
      price: 2300,
      status: "Available",
      litter: "Early Spring 2026 – “Legacy” Litter",
      description:
        "Refined female with outstanding structure and calm confidence. Shows natural protective instinct without over-reactivity. Excellent family or dual-purpose candidate.",
      sire: "K9 Titan van Special Breed (HD A, ED 0/0)",
      dam: "Legacy’s Echo (HD A, ED 0/0, DNA clear)",
      sireHD: "A",
      sireED: "0/0",
      damHD: "A",
      damED: "0/0",
      dna: "Clear – Full panel",
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?q=80&w=800",
      ]),
      deposit: 500,
      certificates: {
        create: [
          { name: "Sire Hip Score", type: "HD", fileUrl: "#" },
          { name: "Sire Elbow Score", type: "ED", fileUrl: "#" },
          { name: "Dam Hip Score", type: "HD", fileUrl: "#" },
          { name: "Dam Elbow Score", type: "ED", fileUrl: "#" },
          { name: "DNA Panel Results", type: "DNA", fileUrl: "#" },
        ],
      },
    },
  ];

  for (const p of puppies) {
    await prisma.puppy.create({ data: p });
  }

  console.log("Seed completed: Admin + 4 puppies created");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
