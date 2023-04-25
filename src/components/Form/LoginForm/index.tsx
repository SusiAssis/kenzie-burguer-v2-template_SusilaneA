import { SubmitHandler, useForm } from "react-hook-form";
import { StyledButton } from "../../../styles/button";
import { StyledForm } from "../../../styles/form";
import Input from "../Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { schemaLogin } from "./validator";
import { useContext, useState } from "react";
import { UserContext } from "../../../providers/UserContext";

export interface ILoginFormData {
  email: string;
  password: string;
}

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginFormData>({ resolver: zodResolver(schemaLogin) });

  const { handleLogin } = useContext(UserContext);

  const submit: SubmitHandler<ILoginFormData> = (data) => {
    handleLogin(data, setLoading);
  };

  return (
    <StyledForm onSubmit={handleSubmit(submit)}>
      <Input
        id="login"
        {...register("email")}
        error={errors?.email?.message}
        label="Email"
        type="text"
      />
      <Input
        id="senha"
        {...register("password")}
        error={errors?.password?.message}
        label="Senha"
        type="password"
      />
      <StyledButton $buttonSize="default" $buttonStyle="green">
        {loading ? "Entrando..." : "Entrar"}
      </StyledButton>
    </StyledForm>
  );
};

export default LoginForm;
