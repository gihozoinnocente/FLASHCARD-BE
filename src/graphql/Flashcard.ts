import {
    extendType,
    nonNull,
    objectType,
    stringArg,
    intArg,
    inputObjectType,
    enumType,
    arg,
    list,
} from "nexus";
import { Prisma } from "@prisma/client";

export const Flashcard = objectType({
    name: "Flashcard",
    definition(t) {
        t.nonNull.int("id");
        t.nonNull.string("description");
        t.nonNull.string("url");
        t.nonNull.dateTime("createdAt");
        t.field("postedBy", {
            type: "User",
            resolve(parent, args, context) {
                return context.prisma.flashcard
                    .findUnique({ where: { id: parent.id } })
                    .postedBy();
            },
        });
        // t.nonNull.list.nonNull.field("commenters", {
        //     type: "User",
        //     resolve(parent, args, context) {
        //         return context.prisma.flashcard
        //             .findUnique({ where: { id: parent.id } })
        //             .commenters();
        //     },
        // });
    },
});

export const Feed = objectType({
    name: "Feed",
    definition(t) {
        t.nonNull.list.nonNull.field("flashcards", { type: Flashcard });
        t.nonNull.int("count");
        t.id("id");
    },
});

export const LinkOrderByInput = inputObjectType({
    name: "LinkOrderByInput",
    definition(t) {
        t.field("description", { type: Sort });
        t.field("url", { type: Sort });
        t.field("createdAt", { type: Sort });
    },
});

export const Sort = enumType({
    name: "Sort",
    members: ["asc", "desc"],
});

// export const LinkQuery = extendType({
//     type: "Query",
//     definition(t) {
//         t.nonNull.field("feed", {
//             type: "Feed",
//             args: {
//                 filter: stringArg(),
//                 skip: intArg(),
//                 take: intArg(),
//                 orderBy: arg({ type: list(nonNull(LinkOrderByInput)) }),
//             },
//             async resolve(parent, args, context) {
//                 const where = args.filter
//                     ? {
//                           OR: [
//                               { description: { contains: args.filter } },
//                               { url: { contains: args.filter } },
//                           ],
//                       }
//                     : {};
//                 const flashcards = await context.prisma.flashcard.findMany({
//                     where,
//                     skip: args?.skip as number | undefined,
//                     take: args?.take as number | undefined,
//                     orderBy: args?.orderBy as
//                         | Prisma.Enumerable<Prisma.LinkOrderByWithRelationInput>
//                         | undefined,
//                 });

//                 const count = await context.prisma.flashcard.count({ where });
//                 const id = `main-feed:${JSON.stringify(args)}`;   
                  
//                 return {
//                     flashcards,
//                     count,
//                     id,
//                 };
//             },
//         });
//     },
// });

export const FlashcardMutation = extendType({
    type: "Mutation",
    definition(t) {
        t.nonNull.field("post", {
            type: "Flashcard",
            args: {
                description: nonNull(stringArg()),
                url: nonNull(stringArg()),
            },
            resolve(parent, args, context) {
                const { description, url } = args;
                const { userId } = context;

                if (!userId) {
                    throw new Error("Cannot post without logging in.");
                }

                const newFlashcard = context.prisma.flashcard.create({
                    data: {
                        description,
                        url,
                        postedBy: { connect: { id: userId } },
                    },
                });

                return newFlashcard;
            },
        });
    },
});
