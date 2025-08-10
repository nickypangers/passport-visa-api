import { VisaBodySchema, type VisaResponse } from "@@/shared/utils/validator";
import { and, eq } from "drizzle-orm";

export default defineEventHandler(async (event): Promise<VisaResponse> => {

  const { passport, destination } = await readValidatedBody(event, VisaBodySchema.parse)

  const visa = await db.query.visas.findFirst({
    where: and(eq(tables.visas.passportId, passport), eq(tables.visas.destinationId, destination)),
    with: {
      passport: true,
      destination: true,
      category: true,
    },
  });

  return {
    id: visa?.id,
    passport: visa?.passport && {
      name: visa.passport.name,
      code: visa.passport.code,
    },
    destination: visa?.destination && {
      name: visa.destination.name,
      code: visa.destination.code,
    },
    dur: visa?.duration,
    category: visa?.category && {
      name: visa.category.name,
      code: visa.category.code,
    },
  };
});
