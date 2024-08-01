import { PostBilling } from '@redux/thunks/Billing.thunk';
import { initialStateI } from '@Interfaces/Form';
import { createSlice } from '@reduxjs/toolkit';


const intialState: initialStateI  = {
    PostBilling: {
        status: 'idle',
        error: undefined,
        response: {
            message: '',
            data: null,
        },
}
};
const BillingSlice = createSlice({ 
    name: 'Billing',
    initialState: intialState,
    reducers: {
        resetPostBillings: (state) => {
            state.PostBilling.status = 'idle';
            state.PostBilling.error = undefined;
            state.PostBilling.response = { message: '', data: null };
        },
    },
    extraReducers: (builder) => {
        builder.addCase(PostBilling.pending, (state) => {
            state.PostBilling.status = 'loading';
        });
        builder.addCase(PostBilling.rejected, (state, action) => {
            state.PostBilling.status = 'failed';
            state.PostBilling.error = action.error.message;
        });
        builder.addCase(PostBilling.fulfilled, (state, action) => {
            state.PostBilling.status = 'succeeded';
            state.PostBilling.response= action.payload;
        });
        
    },
});

export const { resetPostBillings } = BillingSlice.actions;
export default BillingSlice.reducer;