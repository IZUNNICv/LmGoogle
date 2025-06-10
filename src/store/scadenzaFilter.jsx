import { createSlice } from "@reduxjs/toolkit";

export const scadenzaFilterSlice = createSlice({
  name: "scadenzaFilter",
  initialState: {
    showExpiredOnly: false,
  },
  reducers: {
    toggleScadenzaFilter: (state) => {
      state.showExpiredOnly = !state.showExpiredOnly;
    },
    setScadenzaFilter: (state, action) => {
      state.showExpiredOnly = action.payload;
    },
  },
});

export const { toggleScadenzaFilter, setScadenzaFilter } = scadenzaFilterSlice.actions;

export default scadenzaFilterSlice.reducer;
