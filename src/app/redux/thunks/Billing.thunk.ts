import BillingService from '@services/BillingService';
import { createAsyncThunk } from "@reduxjs/toolkit";
import { BillingInfoI } from '@Interfaces/Form';


export const PostBilling = createAsyncThunk('Billing/PostBilling', async (data: BillingInfoI) => {
    const response = await BillingService.Post('/billings', data);
    return response;
});