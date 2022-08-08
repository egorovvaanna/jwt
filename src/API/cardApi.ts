import { createApi} from "@reduxjs/toolkit/query/react";
import { CardResponse, ICard, TransactionReq, TransactionRes } from "../types/cards";
import { baseQueryWithReauth} from './baseQuery';



export const cardsAPI = createApi({
  reducerPath: "cardsAPI",
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Cards', 'CardItem'],
  endpoints: (builder) => ({
    createCards: builder.mutation< CardResponse , ICard>({
      query: (card) => ({
        url: `cards/`,
        method: "POST",
        body: card
      }),
      invalidatesTags: ['Cards']
    }),
    deleteCards: builder.mutation< null, string >({
      query: (id) => ({
        url: `cards/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ['Cards']
    }),
    transactionCards: builder.mutation< TransactionRes , TransactionReq >({
      query: (transaction) => ({
        url: `/transactions/`,
        method: "POST",
        body: transaction
      }),
      invalidatesTags: ['CardItem']
    }),

    getCards: builder.query< CardResponse[] , null>({
      query: () => ({
        url: `/cards/`,
      }),
      providesTags: result => ['Cards']
    }),

    getCardItem: builder.query< CardResponse, string>({
      query: (id) => ({
        url: `/cards/${id}`,
      }),
      providesTags: result => ['CardItem']
    }),
  }),
});