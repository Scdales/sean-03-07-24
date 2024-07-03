import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { BookEntry, BookSnapshot } from '../utils/types';

export type PricesState = {
  bids: { [key: string]: boolean }
  asks: { [key: string]: boolean }
}

const initialState: PricesState = { bids: {}, asks: {} };

const bookSlice = createSlice({
  name: 'prices',
  initialState,
  reducers: {
    resetPrices() {
      return initialState
    },
    addPriceSnapshot(state, action: PayloadAction<BookSnapshot>) {
      const bookEntries = action.payload[1].reduce((acc: PricesState, curr) => {
        if (curr[1] > 0) {
          if (curr[2] > 0) {
            acc.bids[curr[0]] = true;
          } else {
            acc.asks[curr[0]] = true;
          }
        }
        return acc;
      }, { bids: {}, asks: {} });
      state = bookEntries;
    },
    addPriceEntry(state, action: PayloadAction<BookEntry>) {
      const key = action.payload[2] > 0 ? 'bids' : 'asks' as keyof PricesState;
      if (action.payload[1] === 0) {
        delete state[key][action.payload[0]];
      } else if (!state[key][action.payload[0]]) {
        state[key][action.payload[0]] = true
      }
    }
  }
});

export const { resetPrices, addPriceSnapshot, addPriceEntry } = bookSlice.actions;
export default bookSlice.reducer;
