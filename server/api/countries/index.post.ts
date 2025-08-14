import { sql } from "drizzle-orm";
import type { CountryResponse } from "#shared/utils/validator";
import { CountryBodySchema } from "#shared/utils/validator";
import { createAppError } from "#shared/utils/errors";
import { isUserTokenValid } from "../../utils/auth";

export default defineEventHandler(async (event): Promise<CountryResponse> => {
  await isUserTokenValid(event);

  const { country } = await readValidatedBody(event, CountryBodySchema.parse);

  // Optimized single query with explicit JOINs
  const result = await db.execute(sql`
    SELECT 
      c.id as country_id,
      c.name as country_name,
      c.code as country_code,
      v.duration,
      dest.name as destination_name,
      dest.code as destination_code,
      cat.name as category_name,
      cat.code as category_code
    FROM countries c
    LEFT JOIN visas v ON c.id = v.passport_id
    LEFT JOIN countries dest ON v.destination_id = dest.id
    LEFT JOIN categories cat ON v.category_id = cat.id
    WHERE c.id = ${country}
    ORDER BY dest.name, cat.name
  `);

  const rows = result as unknown as Array<{
    country_id: number;
    country_name: string;
    country_code: string;
    duration: number | null;
    destination_name: string | null;
    destination_code: string | null;
    category_name: string | null;
    category_code: string | null;
  }>;

  if (rows.length === 0) {
    throw createAppError({
      statusCode: 404,
      message: "Country not found",
    });
  }

  const firstRow = rows[0];

  // Filter out rows where visa data is null (country exists but no visas)
  const visaData = rows
    .filter((row) => row.destination_name !== null)
    .map((row) => ({
      name: row.destination_name!,
      code: row.destination_code!,
      category: {
        name: row.category_name!,
        code: row.category_code!,
      },
      duration: row.duration,
    }));

  return {
    id: firstRow.country_id,
    name: firstRow.country_name,
    code: firstRow.country_code,
    data: visaData,
  };
});
