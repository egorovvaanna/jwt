
import { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { TransactionReq } from "../../../types/cards";
import { cardsAPI } from "../../../API/cardApi";
import styled from "@emotion/styled";

interface CadrItemProps {
  setVisiblePostModal: (boolean) => void;
  id: string
}

export const TransactionForm: FC<CadrItemProps> = ({ setVisiblePostModal, id }) => {
    const [transaction] = cardsAPI.useTransactionCardsMutation()
    const{
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TransactionReq>();

  const onSubmit: SubmitHandler<TransactionReq> = async (data) => {
    const from_card = id
    const to_card = data.to_card;
    const amount = data.amount;
    const type = "invoice"
    await transaction({from_card, to_card, amount, type})
    setVisiblePostModal(false);
    reset();
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Label>
        Кому:
        
        <Input
          {...register("to_card", { required: "и" })}
          type="string"
        />
        {errors.to_card && (
          <span style={{ color: "red" }}> {errors.to_card.message} </span>
        )}
      </Label>
      <Label>
        Сколько не жалко:
        <Input
          {...register("amount", { required: "ты че нищий?" })}
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
const Select = styled.select`
  width: 100%;
  line-height: 24px;

`;
const Option = styled.option`

`;
const Input = styled.input`
  width: 100%;

  line-height: 24px;
`;
const Label = styled.label`
  width: 100%;
`;
