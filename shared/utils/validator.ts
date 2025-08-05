import { z } from 'zod';

export const CountryBodySchema = z.object({
  country: z.number().min(1, 'Country ID must be a number'),
});

export type CountryBody = z.infer<typeof CountryBodySchema>;

export interface CountryResponse {
  id?: number;
  name?: string;
  code?: string;
  data: {
    name: string;
    code: string;
    category: {
      name: string;
      code: string;
    };
    duration: number | null;
  }[];
}

export const VisaBodySchema = z.object({
  passport: z.number().min(1, 'Passport ID must be a number'),
  destination: z.number().min(1, 'Destination ID must be a number'),
});

export type VisaBody = z.infer<typeof VisaBodySchema>;

export interface VisaResponse {
  id?: number;
  passport?:
    | {
        name: string;
        code: string;
      }
    | false;
  destination?:
    | {
        name: string;
        code: string;
      }
    | false;
  dur?: number | null;
  category?:
    | {
        name: string;
        code: string;
      }
    | false;
}
