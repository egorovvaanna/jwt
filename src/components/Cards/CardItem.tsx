import { FC } from "react";
import { CardResponse } from "../../types/cards";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";

interface CadrItemProps {
  card: CardResponse;
}

export const CardItem: FC<CadrItemProps> = ({ card }) => {
const navigate=useNavigate()
  const sep = (xs, s) => xs.length ? [xs.slice(0, s), ...sep(xs.slice(s), s)] : []


  return (
    <Card onClick = {()=> navigate(`/card/${card.id}`)}>
      <h2>Card</h2>
      <Number>number: {sep(card.number, 4).join(' ')}</Number>
      <p>
        balance: <b>{card.amount}</b>
      </p>
      <p>
        cvv : <b>{card.cvv}</b>
      </p>
    </Card>
  );
};

const Card = styled.div`
  position: relative;
  text-align: left;
  box-sizing: border-box;
  padding: 10px;
  margin: 10px;
  background: linear-gradient(
    60deg,
    rgba(170, 43, 163, 0.3) 0%,
    rgba(195, 132, 200, 1) 35%
  );
  min-height: 150px;
  opacity: 0.85;
  max-width: 300px;
  border-radius: 20px;
  color: white;
  cursor: pointer;
`;
const Number = styled.div`
  margin: 20px 0;
`;
