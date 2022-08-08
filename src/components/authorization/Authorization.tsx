import { FC } from "react";
import { userAPI } from "../../API/userApi";
import { NavLink, useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { AuthReqField } from "../../types/auth";

import styled from "@emotion/styled";

export const Authorization: FC<any> = ({ setAuth }) => {
  const navigate = useNavigate();
  const [authUser] = userAPI.useAuthUserMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthReqField>();

  const Add = async (username: string, password: string) => {
    const result = await authUser({
      username,
      password,
    } as AuthReqField).unwrap();
    localStorage.setItem("jwtToken", result.access);
    setAuth(true);
    navigate("/");
  };

  const onSubmit: SubmitHandler<AuthReqField> = (data) => {
    const username = data.username;
    const password = data.password;
    Add(username, password);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Label>
        Username:
        <Input
          {...register("username", { required: "required field" })}
          type="text"
        />
        {errors.username && (
          <span style={{ color: "red" }}> {errors.username.message} </span>
        )}
      </Label>

      <Label>
        Password:
        <Input
          {...register("password", { required: "required field" })}
          type="password"
        />
        {errors.password && (
          <span style={{ color: "red" }}> {errors.password.message} </span>
        )}
      </Label>
      <button> Войти  </button>
      <NavLink to="/registration"> Зарегайся </NavLink>
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
