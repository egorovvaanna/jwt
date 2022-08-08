import { FC } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { createUserField } from "../../types/auth";
import { userAPI } from "../../API/userApi";
import styled from "@emotion/styled";

export const Registration: FC = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<createUserField>();
  const [createUser] = userAPI.useCreateUserMutation();

  const Add = async (username: string, password: string, email: string) => {
    await createUser({ username, password, email } as createUserField);
    navigate("/authorization");
  };

  const onSubmit: SubmitHandler<createUserField> = async(data) => {
    const username = data.username;
    const password= data.password;
    const email = data.email;
    Add(username, password, email);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Label>
        Email*:
        <Input
          {...register("email", { required: "required field" })}
          type="email"
        />
        {errors.email && (
          <span style={{ color: "red" }}> {errors.email.message} </span>
        )}
      </Label>

      <Label>
        Username*:
        <Input
          {...register("username", { required: "required field" })}
          type="text"
        />
        {errors.username && (
          <span style={{ color: "red" }}> {errors.username.message} </span>
        )}
      </Label>

      <Label>
        Password*:
        <Input
          {...register("password", { required: "required field" })}
          type="password"
        />
        {errors.password && (
          <span style={{ color: "red" }}> {errors.password.message} </span>
        )}
      </Label>
      <button> Зарегаться </button>
      <NavLink to="/authorization">Войти </NavLink>
    </Form>
  );
};

const Form = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 400px;
  border: 1px solid #aa2ba3;
  border-radius: 10px;
  padding: 30px;

  margin: 0 auto;
`;
const Input = styled.input`
  width: 100%;
  line-height: 24px;
`;
const Label = styled.label`
  width: 100%;
`;
