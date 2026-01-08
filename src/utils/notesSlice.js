import { createSlice } from "@reduxjs/toolkit";

const notesSlice = createSlice({
  name: 'notes',
  initialState: [],
  reducers: {
    addNotes: (state, action) => {
      const { data, replace } = action.payload;
      if (replace) {
        return [...data]; // replace state
      } else {
        return [...state, ...data]; // append
      }
    },
    removeNotes: () => {
      return [];
    }
  }
});

export default notesSlice.reducer;
export const { addNotes, removeNotes } = notesSlice.actions;
