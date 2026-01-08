import { createSlice } from "@reduxjs/toolkit";


const sellerPendingSlice = createSlice({
    name: "sellerPending",
    initialState:[],
    reducers: {
        addSellerPendingOrders: (state, action) => {
           return action.payload;
        },
        removeSellerPendingOrders: (state, action) => {
             return state.filter((item) => item.id !== action.payload.id);
        },
    },
});

export const { addSellerPendingOrders, removeSellerPendingOrders } = sellerPendingSlice.actions;
export default sellerPendingSlice.reducer;
