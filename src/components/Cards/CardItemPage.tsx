import { FC, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { cardsAPI } from "../../API/cardApi";
import { Modal } from "../Modal/Modal";
import { TransactionForm } from "./Transactions/TransactionForm";
import { GetTransactionForm } from './Transactions/GetTransactionForm';
import styled from "@emotion/styled";

interface ParamsProps {
  id: string;
  [key: string]: string;
}

export const CardItemPage: FC = () => {
  const params = useParams<ParamsProps>();
  const navigate = useNavigate();
  const [getModal, setVisibleGetModal] = useState(false);
  const [postModal, setVisiblePostModal] = useState(false);
  const { data: card, isLoading } = cardsAPI.useGetCardItemQuery(params.id);
  const sep = (xs, s) =>
    xs.length ? [xs.slice(0, s), ...sep(xs.slice(s), s)] : [];

  return isLoading  ? <h1>fgbh</h1> : (
    <>
    
      <Modal children={<TransactionForm setVisiblePostModal={setVisiblePostModal} id={card.id}/>}
        visible={postModal}
        setVisible={setVisiblePostModal}/>
      <Modal children={<GetTransactionForm setVisibleGetModal={setVisibleGetModal} number={card.number}/>}
        visible={getModal}
        setVisible={setVisibleGetModal}/>

      <Button onClick={() => navigate("/")}> &larr; back </Button>
      <CardPage>
        {card && (
          <Card>

              <h1> Card </h1> {card.name}

            <Number>{sep(card.number, 4).join(" ")}</Number>{" "}
            <Footer>
              {" "}
              <p>
                Balance <br /> <b> {card.amount} </b>{" "}
              </p>
              <p>
                {" "}
                expires <br /> {card.date_expire.slice(0, 10)}{" "}
              </p>
            </Footer>
          </Card>
        )}
        <Options>
          <ButtonTransaction onClick={() => setVisibleGetModal(true)}> Пополнение </ButtonTransaction>
          <ButtonTransaction onClick={() => setVisiblePostModal(true)}> Перевод </ButtonTransaction>
        </Options>
      </CardPage>
    </>
  );
};

const Card = styled.div`
  text-align: left;
  box-sizing: border-box;
  padding: 35px;
  margin: 10px auto;
  background: linear-gradient(
    60deg,
    rgba(170, 43, 163, 0.3) 0%,
    rgba(195, 132, 200, 1) 35%
  );
  min-height: 300px;
  opacity: 0.85;
  max-width: 500px;
  border-radius: 20px;
  color: white;
`;
const Button = styled.button`
  margin: 0px 10px;
`;
const ButtonTransaction = styled.button`
  margin: 0px 10px;
  background: linear-gradient(
    80deg,
    rgba(170, 43, 163, 0.3) 8%,
    rgba(232, 221, 156, 0.8) 60%
  );
  padding: 20px;
  min-width: 200px;
  font-size: 24px;
  font-weight: 600;
`;
const Number = styled.p`
  width: 100%;
  font-size: 30px;
  margin: 25px 0;
  @media (max-width: 400px) {
    font-size: 24px;
  }
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 24px;
  line-height: 1.4;
`;

const Options = styled.div`
  min-width: 100%;
  display: flex;
  justify-content: center;
  text-align: center;
  font-size: 24px;
`;
const CardPage = styled.div`
  min-width: 100%;
  align-items: center;
  font-size: 24px;
`;
