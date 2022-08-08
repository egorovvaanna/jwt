import { FC } from "react";
import { cardsAPI } from "../../API/cardApi";
import { SubmitHandler, useForm } from "react-hook-form";
import { ICard } from "../../types/cards";
import { userAPI } from "../../API/userApi";
import styled from "@emotion/styled";

interface CadrItemProps {
  setVisibleModal: (boolean) => void;
}

export const CardForm: FC<CadrItemProps> = ({ setVisibleModal }) => {
  const { refetch } = userAPI.useGetAccountsQuery(null);
  const [createCard] = cardsAPI.useCreateCardsMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ICard>();

  const onSubmit: SubmitHandler<ICard> = async (data) => {
    const name = data.name;
    const amount = data.amount;
    const account = localStorage.getItem("uuid");
    await createCard({ name, account, amount } as ICard);
    setVisibleModal(false);
    refetch();
    reset();
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Label>
        введи че нить:
        <Input {...register("name", { required: "очень надо" })} type="text" />
        {errors.name && (
          <span style={{ color: "red" }}> {errors.name.message} </span>
        )}
      </Label>
      <Label>
        донат:
        <Input
          {...register("amount", { required: "ты че богатый?" })}
          type="text"
        />
        {errors.name && (
          <span style={{ color: "red" }}> {errors.name.message} </span>
        )}
      </Label>

      <button>Create Card </button>
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
