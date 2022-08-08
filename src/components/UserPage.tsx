import { FC, useState } from "react";
import { Cards } from "./Cards/Cards";
import { Accounts } from "./Bill/Bills";
import { Modal } from "./Modal/Modal";
import { CardForm } from "./../components/Cards/CreateCardForm";
import { userAPI } from "./../API/userApi";
import styled from "@emotion/styled";


export const UserPage: FC = () => {
  const [isModal, setVisibleModal] = useState(false);
  const { data: accounts } = userAPI.useGetAccountsQuery(null);
  return (
    <CreateCard>
      <Accounts />
      <Modal
        children={<CardForm setVisibleModal={setVisibleModal} />}
        visible={isModal}
        setVisible={setVisibleModal}
      />
      {accounts && accounts.length > 0 ? (
        <Button onClick={() => setVisibleModal(true)}> Добавить карту </Button>
      ) : (
        ""
      )}

      <Cards />
    </CreateCard>
  );
};

const CreateCard = styled.div`
  margin: 10px;
  text-align: right;
`;

const Button = styled.button`
  background: linear-gradient(
    90deg,
    rgba(170, 43, 163, 1) 0%,
    rgba(195, 132, 200, 1) 35%
  );
  opacity: 0.7;
  border-radius: 30px;
  transition: all 0.3s ease;
  &:hover {
    background: linear-gradient(90deg, #862181 0%, #916294 35%);
  }
  &:active {
    transform: scale(0.9);
  }
`;
