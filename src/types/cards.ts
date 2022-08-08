export interface ICard {
  name: string;
  account: string;
  amount: string;
}
export interface CardResponse {
  name: string;
  account: string;
  amount: string;
  id: string;
  cvv: string;
  number: string;
  date_expire: string;
  owner?: string;
}

export interface CardState {
  cards: ICard[];
}

export interface ModalTypes{
  isModal: boolean;
  setModal: ()=> void
}

export interface TransactionReq{
  from_card: string;
  to_card: string;
  amount: string;
  type: string
}
export interface TransactionRes{
  from_card: string;
  to_card: string;
  amount: string;
  type: string;
  owner? : string
}