// import { objectType, extendType, nonNull, intArg } from "nexus";
// import { User } from "@prisma/client";

// export const Comment = objectType({
//     name: "Comment",
//     definition(t) {
//         t.nonNull.field("flashcard", { type: "Flashcard" });
//         t.nonNull.field("user", { type: "User" });
//     },
// });

// export const VoteMutation = extendType({
//     type: "Mutation",
//     definition(t) {
//         t.field("comment", {
//             type: "Comment",
//             args: {
//                 flashcardId: nonNull(intArg()),
//             },
//             async resolve(parent, args, context) {
//                 const { userId } = context;
//                 const { flashcardId } = args;

//                 if (!userId) {
//                     throw new Error("Cannot vote without logging in.");
//                 }

//                 const flashcard = await context.prisma.flashcard.update({
//                     where: {
//                         id: flashcardId,
//                     },
//                     data: {
//                         commenters: {
//                             connect: {
//                                 id: userId,
//                             },
//                         },
//                     },
//                 });

//                 const user = await context.prisma.user.findUnique({
//                     where: { id: userId },
//                 });

//                 return {
//                     flashcard,
//                     user: user as User,
//                 };
//             },
//         });
//     },
// });
