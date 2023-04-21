import { useForm } from "react-hook-form";
import { StyledButton } from "../../../styles/button";
import { StyledForm } from "../../../styles/form";
import Input from "../Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { schemaLogin } from "./validator";
import { useContext } from "react";
import { UserContext } from "../../../providers/UserContext";

export interface ILoginFormData {
  email: string;
  password: string;
}

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginFormData>({ resolver: zodResolver(schemaLogin) });

  const { handleLogin } = useContext(UserContext);

  const submit = (data: ILoginFormData) => {
    handleLogin(data);
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
        error={errors?.email?.message}
        label="Password"
        type="password"
      />
      <StyledButton $buttonSize="default" $buttonStyle="green">
        Entrar
      </StyledButton>
    </StyledForm>
  );
};

export default LoginForm;
