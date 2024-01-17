import routeHandler from "@/lib/routeHandler";
import prisma from "@/lib/prisma";
import QuestionSchema from "@/schemas/Question";

// delete a question
// TODO: update positions too
export const DELETE = routeHandler(async (request, context) => {
     const { surveyId, questionId } = context.params;
     const response = await prisma.survey.update({
          where: {
               id: surveyId,
          },
          data: {
               questions: {
                    delete: {
                         id: questionId,
                    },
               },
          },
          include: {
               questions: true,
          },
     });

     return response;
});

// update a question
export const PATCH = routeHandler(async (request, context) => {
     const { surveyId, questionId } = context.params;
     const body = await request.json();
     const validation = await QuestionSchema.safeParseAsync(body);

     if (!validation.success) {
          throw validation.error;
     };

     const { data } = validation;
     const response = await prisma.survey.update({
          where: {
               id: surveyId,
          },
          data: {
               questions: {
                    update: {
                         where: {
                              id: questionId,
                         },
                         data,
                    }
               }
          },
          include: {
               questions: true,
          },
     });
     return response;
});
