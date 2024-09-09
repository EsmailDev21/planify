// quoteslice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { QuoteModel } from "@/lib/types/models";
import { sampleQuotes } from "@/lib/mock/quotes.mock";
type QuoteState = {
  quotes: QuoteModel[];
};

// Initial state
const initialState: QuoteState = {
  quotes: sampleQuotes,
};

const quoteSlice = createSlice({
  name: "qutoes",
  initialState,
  reducers: {
    addQuote(state, action: PayloadAction<QuoteModel>) {
      state.quotes = [action.payload, ...state.quotes];
    },
    updateQuote(state, action: PayloadAction<QuoteModel>) {
      const index = state.quotes.findIndex(
        (quote) => quote.id === action.payload.id
      );
      if (index !== -1) {
        state.quotes[index] = action.payload;
      }
    },
    deleteQuote(state, action: PayloadAction<string>) {
      state.quotes = state.quotes.filter(
        (quote) => quote.id !== action.payload
      );
    },
  },
});

export const { addQuote, deleteQuote, updateQuote } = quoteSlice.actions;

export const selectQuotes = (state: RootState) => state.quotes;

export default quoteSlice.reducer;
