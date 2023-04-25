import Input from "../Input";
import { StyledButton } from "../../../styles/button";
import { StyledForm } from "../../../styles/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { schema } from "../../../pages/RegisterPage/validator";
import { UserContext } from "../../../providers/UserContext";

export interface IRegisterFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const RegisterForm = () => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegisterFormData>({ resolver: zodResolver(schema) });

  const { handleRegister } = useContext(UserContext);

  const submit: SubmitHandler<IRegisterFormData> = (data) => {
    handleRegister(data, setLoading);
  };

  return (
    <StyledForm onSubmit={handleSubmit(submit)}>
      <Input
        type="text"
        id="name"
        {...register("name")}
        label={"Nome"}
        error={errors?.name?.message}
      />
      <Input
        type="email"
        id="email"
        {...register("email")}
        label={"Email"}
        error={errors?.email?.message}
      />
      <Input
        type="password"
        id="password"
        {...register("password")}
        label={"Senha"}
        error={errors?.password?.message}
      />
      <Input
        type="password"
        id="confirmPassword"
        {...register("confirmPassword")}
        label={"Confirmar Senha"}
        error={errors?.confirmPassword?.message}
      />
      <StyledButton $buttonSize="default" $buttonStyle="gray">
        {loading ? "Cadastrando" : "Cadastrar"}
      </StyledButton>
    </StyledForm>
  );
};

export default RegisterForm;
