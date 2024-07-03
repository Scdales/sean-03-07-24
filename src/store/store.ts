import { configureStore } from '@reduxjs/toolkit'
import bookSlice from './ordersSlice';
import pricesSlice from './pricesSlice';
import { useDispatch } from 'react-redux';

export const store = configureStore({
  reducer: {
    book: bookSlice,
    prices: pricesSlice
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
