import Input from "../Input";
import { StyledButton } from "../../../styles/button";
import { StyledForm } from "../../../styles/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { schema } from "../../../pages/RegisterPage/validator";
import { UserContext } from "../../../providers/UserContext";

export interface IRegisterFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegisterFormData>({ resolver: zodResolver(schema) });

  const { handleRegister } = useContext(UserContext);

  const submit = (data: IRegisterFormData) => {
    handleRegister(data);
  };

  return (
    <StyledForm onSubmit={handleSubmit(submit)}>
      <Input
        type="text"
        id="name"
        {...register("name")}
        label={"name"}
        error={errors?.name?.message}
      />
      <Input
        type="email"
        id="email"
        {...register("email")}
        label={"email"}
        error={errors?.email?.message}
      />
      <Input
        type="password"
        id="password"
        {...register("password")}
        label={"password"}
        error={errors?.password?.message}
      />
      <Input
        type="password"
        id="confirmPassword"
        {...register("confirmPassword")}
        label={"confirmPassword"}
        error={errors?.confirmPassword?.message}
      />
      <StyledButton $buttonSize="default" $buttonStyle="gray">
        Cadastrar
      </StyledButton>
    </StyledForm>
  );
};

export default RegisterForm;
