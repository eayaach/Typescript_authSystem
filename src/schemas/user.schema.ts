import { z } from "zod";

// archivo para definir los schemas de validacion con zod
// y los tipos de input para usar en los controllers

// schema para crear usuario
// el objeto body es el que se espera en el req.body
// el refine es para validar que las contraseñas coincidan
export const createUserSchema = z.object({
    body: z.object({
        email: z.string().min(1, { message: "Email is required" }).email("Invalid email"),
        password: z.string().min(8, { message: "Min 8 chars" }),
        passwordConfirmation: z.string().min(1, { message: "Confirm password is required" }),
        firstName: z.string().min(1, { message: "First name is required" }),
        lastName: z.string().min(1, { message: "Last name is required" }),
    }).refine((data) => data.password === data.passwordConfirmation, {
        message: "Passwords do not match",
        path: ["passwordConfirmation"],
    }),
});


export const verifyUserSchema = z.object({
  params: z.object({
    id: z.string(),
    verificationCode: z.string(),
  }),
});


export const forgotPasswordSchema = z.object({
  body: z.object({
    email: z.string().min(1, { message: "Email is required" }).email("Invalid email"),
  }),
});


export const resetPasswordSchema = z.object({
  params: z.object({
    id: z.string(),
    passwordResetCode: z.string(),
  }),
  body: z.object({
    password: z.string().min(8, { message: "Min 8 chars" }),
    passwordConfirmation: z.string().min(1, { message: "Password confirmation is required" }),
  }).refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords do not match",
    path: ["passwordConfirmation"],
  }),
});

// para usar en los controllers
export type CreateUserInput = z.TypeOf<typeof createUserSchema>["body"];

export type VerifyUserInput = z.TypeOf<typeof verifyUserSchema>["params"];

export type ForgotPasswordInput = z.TypeOf<typeof forgotPasswordSchema>["body"];

export type ResetPasswordInput = z.TypeOf<typeof resetPasswordSchema>;