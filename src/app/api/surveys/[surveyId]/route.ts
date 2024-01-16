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

// export async function GET(request: NextRequest, context: ApiHandlerContext) {
//      const { surveyId } = context.params;
//      try {
//           const survey = await prisma.survey.findUniqueOrThrow({
//                where: {
//                     id: surveyId,
//                },
//           });
//           return NextResponse.json({
//                data: survey,
//           });
//      } catch (e) {
//           if (e instanceof Prisma.PrismaClientKnownRequestError) {
//                return NextResponse.json({
//                     error: e.message,
//                },
//                     {
//                          status: 500,
//                     })
//           }
//      }

//      return NextResponse.json({
//           error: "Unknown error occured!",
//      },
//           {
//                status: 500,
//           })
// }


// update a survey
// export async function PATCH(request: NextRequest, context: ApiHandlerContext) {
//      const { surveyId } = context.params;
//      const body = await request.json();
//      try {
//           const validation = await SurveySchema.safeParseAsync(body);
//           if (!validation.success) {
//                throw validation.error;
//           }
//           const { data } = validation;
//           const survey = await prisma.survey.update({
//                where: {
//                     id: surveyId
//                },
//                data,
//           })

//           return NextResponse.json({
//                data: survey,
//           });
//      } catch (e) {
//           return NextResponse.json({
//                error: "Something went wrong",
//           });
//      }
// }