import { FC } from "react";
import { cardsAPI } from "../../API/cardApi";
import { IAccount } from "../../types/account";

import styled from "@emotion/styled";

interface AccountProps {
  account: IAccount;
  remove: (id: string) => void;
  index: number;
}

export const AccountItem: FC<AccountProps> = ({ account, remove, index }) => {
  const currentBill = localStorage.getItem("uuid");

  const { refetch } = cardsAPI.useGetCardsQuery(null, {
    selectFromResult: ({ data }) => ({
      cards: data?.filter((card) => card.account === currentBill),
    }),
  });

  const changeAcc = (id) => {
    localStorage.setItem("uuid", id);
    refetch();
  };
  const deleteAcc = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm("Уверен?????")) {
      remove(account.id);
      localStorage.removeItem("uuid");
    } else {
      return;
    }
  };

  return currentBill === account.id ? (
    <AccountCurrent onClick={() => changeAcc(account.id)}>
      Счет {index + 1}
      <p>
        {" "}
        <b> всeго средств : </b> {account.amount ? account.amount : 0}{" "}
      </p>
      <Button onClick={(e) => deleteAcc(e)}>&#10008;</Button>
    </AccountCurrent>
  ) : (
    <Account onClick={() => changeAcc(account.id)}>
      Счет {index + 1}
      <p>
        {" "}
        <b> всeго средств : </b> {account.amount ? account.amount : 0}{" "}
      </p>
      <Button onClick={(e) => deleteAcc(e)}>&#10008;</Button>
    </Account>
  );
};

const Account = styled.div`
  margin: 10px;
  text-align: left;
  display: flex;
  justify-content: space-between;
  border: 1px solid;
  cursor: pointer;
  padding: 10px;
`;
const AccountCurrent = styled(Account)`
  box-shadow: 2px 0px 10px #ab2ca5;
  background-color: #ab2ca53f;
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
