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
            resolve(parent:any, args:any, context:any) {
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



export const FlashcardMutation = extendType({
    type: "Mutation",
    definition(t) {
        t.nonNull.field("post", {
            type: "Flashcard",
            args: {
                description: nonNull(stringArg()),
                url: nonNull(stringArg()),
            },
            resolve(parent:any, args:any, context:any) {
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


      // get flashcard by id
      t.field('getFlashcard', {
        type: 'Flashcard',
        args: {
          id: nonNull(intArg()),
        },
        resolve(parent:any, args:any, context:any) {
          return context.prisma.flashcard.findUnique({
            where: {
              id: args.id,
            },
          });
        },
      });
  
      // update flashcard by id
      t.field('updateFlashcard', {
        type: 'Flashcard',
        args: {
          id: nonNull(intArg()),
          description: nonNull(stringArg()),
          url: nonNull(stringArg()),
        },
        resolve(parent:any, args:any, context:any) {
          return context.prisma.flashcard.update({
            where: {
              id: args.id,
            },
            data: {
              description: args.description,
              url: args.url,
            },
          });
        },
      });
  
      // delete flashcard by id
      t.field('deleteFlashcard', {
        type: 'Flashcard',
        args: {
          id: nonNull(intArg()),
        },
        resolve(parent:any, args:any, context:any) {
          const del= context.prisma.flashcard.delete({
            where: {
              id: args.id,
            },
          });
        return(del)
        },
      });
    },
});


