import { createSlice } from "@reduxjs/toolkit";

const bookSlice = createSlice({
    name: 'book',
    initialState: [],
    reducers: {
        addBooks: (state, action) => {
      const { data, replace = true } = action.payload;
      if (!Array.isArray(data)) return state;
      // replace = true => new filter applied, start fresh
      return replace ? [...data] : [...state, ...data];
    },
        removeBooks: (state) => {
            return [];
        }
    }
})

export default bookSlice.reducer
export const {addBooks,removeBooks} = bookSlice.actions

