import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    const newFlashcard = await prisma.flashcard.create({
        data: {
            description: "Fullstack tutorial for GraphQL",
            url: "www.howtographql.com",
        },
    });

    const allFlashcards = await prisma.flashcard.findMany();
    console.log(allFlashcards);
}

main()
    .catch((e) => {
        throw e;
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
