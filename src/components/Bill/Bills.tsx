import { FC } from "react";
import { userAPI } from "../../API/userApi";
import { AccountItem } from "./BillItem";

import styled from "@emotion/styled";

export const Accounts: FC = () => {
  const [createAccount] = userAPI.useCreateAccountMutation();
  const [deleteAccount] = userAPI.useDeleteAccountMutation();
  const { data: accounts } = userAPI.useGetAccountsQuery(null);

  const AddBill = async () => {
    const data = await createAccount(null).unwrap();
    localStorage.setItem("uuid", data.id);
  };

  return (
    <CreateCard>
      <Button onClick={AddBill}> Создать счет </Button>
      {accounts &&
        accounts.map((account, index) => (
          <AccountItem
            index={index}
            account={account}
            remove={deleteAccount}
            key={account.id}
          />
        ))}
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
