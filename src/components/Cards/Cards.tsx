import { FC } from "react";
import List from "../List";
import {CardItem} from "./CardItem";
import { CardResponse } from "../../types/cards";
import { cardsAPI } from "../../API/cardApi";

export const Cards: FC = () => {
const {cards} = cardsAPI.useGetCardsQuery(null, {
    selectFromResult: ({ data }) => ({
      cards: data?.filter((card) => card.account === localStorage.getItem('uuid')),
    }),
  })

  return !cards|| cards.length<1  ?  <h2> У тебя тут  пока нет карт  </h2> : (
    <div>
      <List
        items={cards}
        renderItem={(card: CardResponse) => <CardItem key={card.id} card={card}/>}
      />
    </div>
  );
};


