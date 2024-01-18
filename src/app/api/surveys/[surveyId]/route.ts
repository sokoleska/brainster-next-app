import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import SurveySchema from "@/schemas/Survey";
import routeHandler from "@/lib/routeHandler";

type ApiHandlerContext = {
     params: {
          surveyId: string;
     };
};

// get a survey
export const GET = routeHandler(async (request, context) => {
     const { surveyId } = context.params;
     const survey = await prisma.survey.findUniqueOrThrow({
          where: {
               id: surveyId,
          },
          include: {
               questions: true,
          }
     });
     return survey;
});


// update a survey
export const PATCH = routeHandler(async (request, context) => {
     const { surveyId } = context.params;
     const body = await request.json();

     const validation = await SurveySchema.safeParseAsync(body);

     if (!validation.success) {
          throw validation.error;
     }

     const { data } = validation;
     const survey = await prisma.survey.update({
          where: {
               id: surveyId,
          },
          data,
     });

     return survey;

});

// delete a survey
export const DELETE = routeHandler(async (request, context) => {
     const { surveyId } = context.params;
     const survey = await prisma.survey.delete({
          where:
          {
               id: surveyId,
          }
     })

})

