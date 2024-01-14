import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

type ApiHandlerContext = {
     params: {
          surveyId: string;
     };
};

// get a survey
export async function GET(request: NextRequest, context: ApiHandlerContext) {
     const { surveyId } = context.params;
     try {
          const survey = await prisma.survey.findUniqueOrThrow({
               where: {
                    id: surveyId,
               },
          });
          return NextResponse.json({
               data: survey,
          });
     } catch (e) {
          if (e instanceof Prisma.PrismaClientKnownRequestError) {
               return NextResponse.json({
                    error: e.message,
               },
                    {
                         status: 500,
                    })
          }
     }

     return NextResponse.json({
          error: "Unknown error occured!",
     },
          {
               status: 500,
          })
}