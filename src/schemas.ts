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

export const restClientHeaderSchema = z.object({
  key: z.string().min(1, "Key is required"),
  value: z.string().min(1, "Value is required"),
});

export type RestClientHeader = z.infer<typeof restClientHeaderSchema>;
