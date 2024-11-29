import { z } from "zod";

export const TutoradoDTO = z.object({
    name: z.string(),
    identificacion: z.string(),
  });