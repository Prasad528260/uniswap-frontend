import { createSlice } from "@reduxjs/toolkit";

const pendingOrderSlice = createSlice({
    name : 'pendingOrder',
    initialState:[],
    reducers:{
        addPendingOrder:(state,action)=> {
            return action.payload;
        },
        removePendingOrder:(state,action)=> {
            return state.filter((item)=> item.id !== action.payload.id)
        }
    }
})

export default pendingOrderSlice.reducer
export const {addPendingOrder,removePendingOrder} = pendingOrderSlice.actions
