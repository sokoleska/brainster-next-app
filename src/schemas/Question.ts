import { z } from "zod";

const QuestionSchema = z.object({
     text: z.string(),
     required: z.boolean().default(true),
     position: z.number().min(0).optional(),
})

export default QuestionSchema;