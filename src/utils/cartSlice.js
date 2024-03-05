import { createSlice } from "@reduxjs/toolkit";


const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
    },
    reducers: {
        // state represents the previous state
        addItem: (state, action) => {
            state.items.push(action.payload);
        },
        clearCart: (state, action)=>{
            state.items = []
        },
        removeItem: (state, action) => {
            const idToRemove = action.payload.id;
            state.items = state.items.filter( (item)=>item.id != idToRemove)
        }
    },
});

export const { addItem, removeItem, clearCart} = cartSlice.actions;

export default cartSlice.reducer;