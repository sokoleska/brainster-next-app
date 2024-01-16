import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

type ApiHandlerContext = {
     params: Record<string, any>;
};

type HandlerFunction = (
     request: NextRequest,
     context: ApiHandlerContext,
) => Promise<any>;

const routeHandler =
     (handler: HandlerFunction) =>
          async (request: NextRequest, context: ApiHandlerContext): Promise<any> => {
               try {
                    const data = await handler(request, context);

                    return NextResponse.json({
                         data,
                    });
               }
               catch (e) {
                    if (e instanceof ZodError) {
                         return NextResponse.json(
                              { error: "Bad request", details: e.errors, },
                              { status: 400, });

                    } else if (e instanceof Prisma.PrismaClientValidationError) {
                         return NextResponse.json(
                              { error: "Bad request", details: e.message, },
                              { status: 400, });

                    } else if (e instanceof Prisma.PrismaClientKnownRequestError) {
                         return NextResponse.json(
                              { error: "Internal server error", details: e.message, },
                              { status: 500, });
                    } else {
                         console.log("Unexpected error:", e);
                         return NextResponse.json(
                              { error: "Internal server error", details: "An unexpected error occured!", },
                              { status: 500, });
                    }
               }

          }

export default routeHandler;