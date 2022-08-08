import { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { TransactionReq } from "../../../types/cards";
import { cardsAPI } from "../../../API/cardApi";
import styled from "@emotion/styled";

interface CadrItemProps {
  setVisibleGetModal: (boolean) => void;
  number: string
}

export const GetTransactionForm: FC<CadrItemProps> = ({ setVisibleGetModal, number }) => {
    const [transaction] = cardsAPI.useTransactionCardsMutation()
    const{
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TransactionReq>();

  const onSubmit: SubmitHandler<TransactionReq> = async (data) => {
    const from_card = data.from_card;
    const to_card = number
    const amount = data.amount;
    const type = "invoice"
    await transaction({from_card, to_card, amount, type})
    setVisibleGetModal(false);
    reset();
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Label>
        От кого:
        
        <Input
          {...register("from_card", { required: "и" })}
          type="string"
        />
        {errors.to_card && (
          <span style={{ color: "red" }}> {errors.to_card.message} </span>
        )}
      </Label>
      <Label>
        Сколько:
        <Input
          {...register("amount", { required: "?" })}
          type="text"
        />
        {errors.amount && (
          <span style={{ color: "red" }}> {errors.amount.message} </span>
        )}
        
      </Label>

      <button> Send </button>
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
