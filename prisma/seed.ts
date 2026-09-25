   
      
   import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    throw new Error("ADMIN_EMAIL and ADMIN_PASSWORD must be set in your .env file");
  }

  const passwordHash = await bcrypt.hash(password, 12);

  await prisma.admin.upsert({
    where: { email },
    update: {},
    create: {
      email,
      passwordHash,
      name: "Admin", // Matches your optional name field
    },
  });

  console.log("✅ Admin user seeded successfully");
  const sampleReviews = [
    ["Sample Client Story 01", "United States", 5, "A thoughtful experience", "Sample review for website demonstration purposes. The placement process was presented clearly and the experience was thoughtfully organized."],
    ["Sample Client Story 02", "United States", 5, "Beautifully presented", "Sample review for website demonstration purposes. The information was easy to review and the overall experience felt personal and professional."],
    ["Sample Client Story 03", "United States", 5, "A smooth process", "Sample review for website demonstration purposes. Communication was clear throughout the example placement process."],
    ["Sample Client Story 04", "United States", 5, "Well prepared", "Sample review for website demonstration purposes. The example profile gave us useful information to consider before making a decision."],
    ["Sample Client Story 05", "United States", 5, "Personal attention", "Sample review for website demonstration purposes. The example experience highlights attentive communication and thoughtful placement."],
    ["Sample Client Story 06", "United States", 5, "Clear information", "Sample review for website demonstration purposes. The available information was organized in a way that made comparison simple."],
    ["Sample Client Story 07", "United States", 5, "A premium experience", "Sample review for website demonstration purposes. The example journey felt polished, calm and easy to follow."],
    ["Sample Client Story 08", "United States", 5, "Very informative", "Sample review for website demonstration purposes. The example documentation and profile details made the process feel transparent."],
    ["Sample Client Story 09", "United States", 5, "Thoughtful placement", "Sample review for website demonstration purposes. The example conversation focused on finding an appropriate match."],
    ["Sample Client Story 10", "United States", 5, "Excellent presentation", "Sample review for website demonstration purposes. The website experience and example communication were clear and refined."],
    ["Sample Client Story 11", "United States", 5, "Great communication", "Sample review for website demonstration purposes. The example inquiry process felt direct and personal."],
    ["Sample Client Story 12", "United States", 5, "A careful approach", "Sample review for website demonstration purposes. The example placement journey emphasized information and preparation."],
    ["Sample Client Story 13", "United States", 5, "Very professional", "Sample review for website demonstration purposes. The example experience was structured and straightforward from inquiry to placement."],
    ["Sample Client Story 14", "United States", 5, "Lovely experience", "Sample review for website demonstration purposes. The example client journey was presented with care and attention to detail."],
    ["Sample Client Story 15", "United States", 5, "Well documented", "Sample review for website demonstration purposes. The example puppy information made it easier to understand the available details."],
    ["Sample Client Story 16", "United States", 5, "A welcoming process", "Sample review for website demonstration purposes. The example communication made the process feel approachable and organized."],
    ["Sample Client Story 17", "United States", 5, "Highly considered", "Sample review for website demonstration purposes. The example experience reflected a deliberate and thoughtful approach to placement."],
    ["Sample Client Story 18", "United States", 5, "Easy to understand", "Sample review for website demonstration purposes. The example information was concise, useful and presented clearly."],
    ["Sample Client Story 19", "United States", 5, "Strong attention to detail", "Sample review for website demonstration purposes. The example profile and communication demonstrated careful attention to the details."],
    ["Sample Client Story 20", "United States", 5, "A memorable experience", "Sample review for website demonstration purposes. The example journey was designed to feel personal, informative and professional."],
  ] as const;

  for (const [name, location, rating, title, content] of sampleReviews) {
    await prisma.review.upsert({
      where: { id: `sample-review-${name.slice(-2)}` },
      update: { name, location, rating, title, content, approved: true },
      create: { id: `sample-review-${name.slice(-2)}`, name, location, rating, title, content, approved: true },
    });
  }

  console.log("✅ 20 clearly labeled sample reviews seeded");

}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });