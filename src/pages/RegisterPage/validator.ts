import * as z from "zod";

export const schema = z
  .object({
    name: z.string().nonempty("O nome é obrigatório"),
    email: z
      .string()
      .min(1, "O e-mail é obrigatório")
      .email("O e-mail deve estar no formato correto"),
    password: z
      .string()
      .min(7, {
        message: "A senha é obrigatória e precisa de mínimo 7 caracteres",
      })
      .regex(/(?=.*?[a-z])/, "É necessário ao menos uma letra minúscula")
      .regex(/(?=.*?[A-Z])/, "É necessário ao menos uma letra mainúscula")
      .regex(/(?=.*?[0-9])/, "É necessário pelo menos um número")
      .regex(/(?=.*?[\W])/, "É necessário no mínimo um carácter especial"),
    confirmPassword: z.string().min(1, "A confirmação de senha é obrigatória"),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: "As senhas precisam corresponder",
    path: ["confirmPassword"],
  });
