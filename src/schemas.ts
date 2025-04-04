import { z } from "zod";

const withDigit = z.string().regex(/^(?=.*\d).+$/g, {
  message: "Password must contain at least one digit",
});
const withLetter = z.string().regex(/^(?=.*[a-z,A-Z]).+$/g, {
  message: "Password must contain at least one letter",
});
const withSpecialChar = z.string().regex(/^(?=.*[!@#$%^&*]).+$/g, {
  message: "Password must contain at least one special character",
});

const passwordSchema = z
  .string()
  .min(8, "Password length must be at least 8 chars")
  .and(withDigit)
  .and(withLetter)
  .and(withSpecialChar);

export const credentialsSchema = z.object({
  email: z.string().min(1, "Email is required").email(),
  password: passwordSchema,
});

export const registerSchema = credentialsSchema
  .extend({
    password_confirm: z.string().min(1, "Confirm the password"),
  })
  .refine(
    ({ password, password_confirm }) => {
      return password === password_confirm;
    },
    { message: "Passwords must match!", path: ["password_confirm"] },
  );

export type UserCredentials = z.infer<typeof credentialsSchema>;

export const restClientSchema = z.object({
  method: z.string().min(1, "Method is required"),
  api_url: z.string().min(1, "URL is required"),
});

export type RestClient = z.infer<typeof restClientSchema>;
