import { createSlice } from "@reduxjs/toolkit";


const sellerCompletedSlice = createSlice({
    name: "sellerCompleted",
    initialState:[],
    reducers: {
        addSellerCompletedOrders: (state, action) => {
           return action.payload;
        },
        removeSellerCompletedOrders: (state, action) => {
             return state.filter((item) => item._id !== action.payload._id);
        },
    },
});

export const { addSellerCompletedOrders, removeSellerCompletedOrders } = sellerCompletedSlice.actions;
export default sellerCompletedSlice.reducer;
