import { SurveyStatus } from "@prisma/client";
import { z } from "zod";

const SurveySchema = z.object({
  name: z.string(),
  introduction: z.string().optional(),
  manager: z.string().email(),
  status: z.nativeEnum(SurveyStatus).default(SurveyStatus.DRAFT),
})

export default SurveySchema;
