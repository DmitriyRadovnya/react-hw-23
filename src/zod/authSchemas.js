import * as z from "zod";

export const registerSchema = z.object({
  login: z.string().min(1, "Логин обязателен"),
  email: z.email("Некорректная почта"),
  password: z.string().min(6, "Минимум 6 символов"),
  gender: z
    .string({ required_error: "Выберите пол" })
    .min(1, "Выберите пол")
    .refine((v) => ["male", "female"].includes(v), "Выберите пол"),
  // age: z.string("/^([1-9][0-9]?|100)$/").min(1, "Укажите ваш возраст"),
  age: z.coerce
    .number({ invalid_type_error: "Укажите ваш возраст" })
    .int("Введите целое число")
    .min(1, "Минимум 1 год")
    .max(100, "Максимум 100 лет"),
});

export const loginSchema = z.object({
  email: z.email("Некорректная почта"),
  password: z.string().min(6, "Минимум 6 символов"),
});
