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
    nullable,
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


export const FlashcardQuery = extendType({
  type:"Query",
  definition(t){
     // get flashcard by id
     t.nonNull.field('getOneFlashcard', {
      type: 'Flashcard',
      args: {
        id: nonNull(intArg()),
      },
      async resolve(parent:any, args:any, context:any) {
        const { userId} =context;
        
        if(!userId){
          throw new Error("Please log in to perform the action");
          
        }
        const cardOfRelatedUser =await context.prisma.flashcard.findUnique({
          where: {
            id: args.id,
          },
        });
        if(cardOfRelatedUser.postedById === userId){
          return cardOfRelatedUser
        } else {
          throw new Error("Flashcard doesn't belong to you");
          
        }
      },
    });

    //get all flashcards
    t.nonNull.list.nonNull.field('getAllFlashcard', {
      type: 'Flashcard',
  
      async resolve(parent:any, args:any, context:any) {
        const { userId } =context
        if(!userId){
          throw new Error("Please Login to get all the card");
          
        }
        const getAllFlashcard= await context.prisma.flashcard.findMany({
          where:{
            postedById: userId
          }
        });
        return getAllFlashcard;
      },
    });

  }
})
  
export const FlashcardMutation = extendType({
    type: "Mutation",
    definition(t) {
        t.nonNull.field("post", {
            type: "Flashcard",
            args: {
                description: nonNull(stringArg()),
                url: nonNull(stringArg()),
            },
            async resolve(parent:any, args:any, context:any) {
                const { description, url } = args;
                const { userId } = context;

                if (!userId) {
                    throw new Error("Cannot post without logging in.");
                }

                const newFlashcard = await context.prisma.flashcard.create({
                    data: {
                        description,
                        url,
                        postedBy: { connect: { id: userId } },
                    },
                });

                return newFlashcard;
            },
        });

   
  
      // update flashcard by id
      t.field('updateFlashcard', {
        type: 'Flashcard',
        args: {
          id: nullable(intArg()),
          description: nullable(stringArg()),
          url: nullable(stringArg()),
        },
        async resolve(parent:any, args:any, context:any) {

        const { userId} =context;
        
        if(!userId){
          throw new Error("Please log in to perform the action");
          
        }
        const updatedFlashcard =await context.prisma.flashcard.update({
            where: {
              id: args.id,
            },
            data: {
              description: args.description,
              url: args.url,
            },
          });
          if(updatedFlashcard.postedById === userId){
            return updatedFlashcard
          } else{
            throw new Error("You are trying to update a card which doesn't belong to you");
            
          }
        },
      });
  
      // delete flashcard by id
      t.field('deleteFlashcard', {
        type: 'Flashcard',
        args: {
          id: nonNull(intArg()),
        },
        async resolve(parent:any, args:any, context:any) {
          const { userId} =context;
        
          if(!userId){
            throw new Error("Please log in to perform the action");
            
          }
          const del=await context.prisma.flashcard.delete({
            where: {
              id: args.id,
            },
          });
          if(del.postedById === userId){
            return(del)
          } else{
            throw new Error("You cannot delete a card which doesn't belong to you");
            
          }
       
        },
      });
    },
});


