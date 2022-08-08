import { configureStore } from '@reduxjs/toolkit'
import { cardsAPI } from '../API/cardApi'
import { userAPI } from '../API/userApi'



export const store = configureStore({
  reducer: {
      [userAPI.reducerPath]: userAPI.reducer,
      [cardsAPI.reducerPath]: cardsAPI.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(userAPI.middleware, cardsAPI.middleware)
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch