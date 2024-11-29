import { z } from "zod";

export const TutorDTO= z.object({
  name: z.string().nonempty("Required"),
  identificacion: z.string().nonempty("Required"),
  experticia: z.string().optional()
});