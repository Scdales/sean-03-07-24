import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { BookEntry, BookSnapshot } from '../utils/types';

export type BookState = {
  bids: { [key: string]: BookEntry }
  bidsTotalAmount: number
  asks: { [key: string]: BookEntry }
  asksTotalAmount: number
}

const initialState: BookState = { bids: {}, bidsTotalAmount: 0, asks: {}, asksTotalAmount: 0 };

const bookSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {
    resetBook() {
      return initialState
    },
    addBookSnapshot(state, action: PayloadAction<BookSnapshot>) {
      const bookEntries = action.payload[1].reduce((acc: Pick<BookState, 'bids' | 'asks'>, curr) => {
        if (curr[1] > 0) {
          if (curr[2] > 0) {
            acc.bids[curr[0]] = curr;
          } else {
            acc.asks[curr[0]] = curr;
          }
        }
        return acc;
      }, { bids: {}, asks: {} });
      const bidsTotalAmount = Object.keys(bookEntries.bids).reduce((acc: number, curr) => acc + bookEntries.bids[curr][2], 0)
      const asksTotalAmount = Object.keys(bookEntries.asks).reduce((acc: number, curr) => acc + bookEntries.asks[curr][2], 0)
      state = { ...bookEntries, bidsTotalAmount, asksTotalAmount };
    },
    addBookEntry(state, action: PayloadAction<BookEntry>) {
      const key = action.payload[2] > 0 ? 'bids' : 'asks' as keyof Pick<BookState, 'bids' | 'asks'>;
      if (action.payload[1] === 0) {
        delete state[key][action.payload[0]];
      } else {
        state[key][action.payload[0]] = key === 'asks' ? [action.payload[0], action.payload[1], -action.payload[2]] : action.payload;
      }
      state[`${key}TotalAmount`] = Object.keys(state[key]).reduce((acc: number, curr) => acc + state[key][curr][2], 0)
    }
  }
});

export const { resetBook, addBookSnapshot, addBookEntry } = bookSlice.actions;
export default bookSlice.reducer;
