import { configureStore } from "@reduxjs/toolkit";
import  userReducer  from "./userSlice";
import  notesReducer  from "./notesSlice";
import  bookReducer  from "./bookSlice";
import  requestReducer  from "./requestSlice";
import  completedOrderReducer  from "./completedOrderSlice";
import  pendingOrderReducer  from "./pendingOrderSlice";
import  sellerPendingOrdersReducer  from "./sellerPendingSlice";
import  sellerCompletedOrdersReducer  from "./sellerCompleted";

export const store = configureStore({
    reducer:{
        user : userReducer,
        notes : notesReducer,
        books : bookReducer,
        completedOrder : completedOrderReducer,
        pendingOrder : pendingOrderReducer,
        request : requestReducer,
        sellerPending : sellerPendingOrdersReducer,
        sellerCompleted : sellerCompletedOrdersReducer
    }
})