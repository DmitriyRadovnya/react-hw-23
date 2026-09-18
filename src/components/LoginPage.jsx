import {
  Box,
  Button,
  FormLabel,
  TextField,
  Typography,
  Link as MuiLink,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../validation/authSchemas";
import { Link } from "react-router";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useAuth } from "../hooks/useAuth";

export const LoginPage = () => {
  const [showPass, setShowPass] = useState();
  const { signIn } = useAuth();
  const {
    watch,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const togglePasswordVisibility = () => {
    setShowPass((p) => !p);
  };

  const onSubmit = (data) => {
    signIn.mutate(data);
  };
  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      sx={{
        width: "500px",
        p: 5,
        display: "flex",
        alignSelf: "center",
        flexDirection: "column",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 2,
      }}
    >
      <FormLabel>Вход</FormLabel>
      <TextField
        name="email"
        label="Почта"
        placeholder="Введите почту"
        {...register("email")}
        error={!!errors.email}
        helperText={errors.email?.message}
        sx={{ width: "100%" }}
      />
      <TextField
        name="password"
        label="Пароль"
        type={showPass ? "text" : "password"}
        placeholder="Придумайте пароль"
        {...register("password")}
        error={!!errors.password}
        helperText={errors.password?.message}
        sx={{ width: "100%" }}
        slotProps={{
          input: {
            endAdornment:
              watch("password")?.length > 0 ? (
                <InputAdornment position="end">
                  <IconButton onClick={togglePasswordVisibility} edge="end">
                    {showPass ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ) : null,
          },
        }}
      />
      <Button type="submit" variant="contained">
        Войти
      </Button>
      <Typography>
        Нет аккаунта?{" "}
        <MuiLink component={Link} to="/register">
          Зарегистрируйся
        </MuiLink>
      </Typography>
    </Box>
  );
};
