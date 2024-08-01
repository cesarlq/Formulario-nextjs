"use client";
import React, { use, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import style from "../Styles/Form.module.scss";
import { AlertColor, Button, CircularProgress, MenuItem, TextField } from "@mui/material";
import { BillingInfoI } from "@Interfaces/Form";
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { PostBilling } from '@redux/thunks/Billing.thunk';
import { resetPostBillings } from '@redux/reducers/Billing.reducer';
import { Snackbar, Alert } from '@mui/material';

const FormBilling: React.FC = (props) => {
  const dispatch = useAppDispatch();
  const [openOneSnackbar, setOpenOneSnackbar] = useState({ snackbarMessage: '', snackbarSeverity: "success", open: false });
  const postBillingResponse = useAppSelector((state) => state.billingReducer.PostBilling );
  const {register, handleSubmit, watch ,formState: { errors }, reset} = useForm<BillingInfoI>({
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      phone: null,
      Address: {
        street: "",
        city: "",
        state: "",
        zip: null,
      },
    },
  });

  const submit = (data: BillingInfoI) => {
    dispatch(
      PostBilling(data)
    )
    
  };

  useEffect(() => {
   if (postBillingResponse.status === 'succeeded') {
    setOpenOneSnackbar({
      snackbarMessage: postBillingResponse.response.message,
      snackbarSeverity: "success",
      open: true
    });
    dispatch(resetPostBillings());
    reset();
   }
   if (postBillingResponse.status === 'failed') {
    dispatch(resetPostBillings());
   }
   console.log('postBillingResponse', postBillingResponse);
  },[postBillingResponse]);

  return (
    <div>
      {postBillingResponse.status === 'loading' ? 
      <CircularProgress />:
      <div className={`${style["FormContainer"]}`}>
        <h1>Form Billing</h1>
        <form onSubmit={handleSubmit(submit)}>
          <div className={`${style["FormSeccion1"]}`}>
            <TextField 
                disabled={false} 
                placeholder="Name" 
                variant="outlined"
                focused={Boolean(watch('name'))}
                error={Boolean(errors.name)}
                helperText={errors.name?.message}
                {...register('name', {
                    required: {
                        value: true,
                        message: 'Campo requerido'
                    }
                })}
            />
            <TextField
                type="email"
                focused={Boolean(watch('email'))}
                error={Boolean(errors.email)}
                helperText={errors.email?.message}
                {...register('email', {
                    required: {
                        value: true,
                        message: 'Email requerido'
                    }
                })}
                disabled={false}
                placeholder="Email"
                variant="outlined"
            />
          </div>
          <div className={`${style["FormSeccion1"]}`}>
            <TextField
                focused={Boolean(watch('phone'))}
                error={Boolean(errors.phone)}
                helperText={errors.phone?.message}
                {...register('phone', {
                    required: {
                        value: true,
                        message: 'Telefono requerido'
                    }
                })}
                disabled={false}
                placeholder="Phone"
                variant="outlined"
            />
            <TextField
                focused={Boolean(watch('Address.street'))}
                error={Boolean(errors.Address?.street)}
                helperText={errors.Address?.street?.message}
                {...register('Address.street', {
                    required: {
                        value: true,
                        message: 'Calle requerida'
                    }
                })}
                disabled={false}
                placeholder="Street"
                variant="outlined"
            />
          </div>
          <div className={`${style["FormSeccion1"]}`}>
            <TextField 
                focused={Boolean(watch('Address.zip'))}
                error={Boolean(errors.Address?.zip)}
                helperText={errors.Address?.zip?.message}
                {...register('Address.zip', {
                    required: {
                        value: true,
                        message: 'Zip requerido'
                    }
                })}
                disabled={false} 
                placeholder="Zip" 
                variant="outlined" 
            />
            <TextField
                className={`${style["select"]}`}
                focused={Boolean(watch('Address.suburb'))}
                error={Boolean(errors.Address?.suburb)}
                helperText={errors.Address?.suburb?.message}
                {...register('Address.suburb', {
                    required: {
                        value: true,
                        message: 'Suburb requerido'
                    }
                })}
                defaultValue={0}
                select
                disabled={false}
                placeholder="Suburb"
                variant="outlined"
            >
                <MenuItem key={0} value={0}>{'Elije una opcion'}</MenuItem>
            </TextField>
          </div>
          <div className={`${style["FormSeccion1"]}`}>
            <TextField 
              focused={Boolean(watch('Address.city'))}
              error={Boolean(errors.Address?.city)}
              helperText={errors.Address?.city?.message}
              {...register('Address.city', {
                  required: {
                      value: true,
                      message: 'Ciudad requerida'
                  }
              })}
              disabled={false} 
              placeholder="City" 
              variant="outlined" 
            />
            <TextField
                focused={Boolean(watch('Address.state'))}
                error={Boolean(errors.Address?.state)}
                helperText={errors.Address?.state?.message}
                {...register('Address.state', {
                    required: {
                        value: true,
                        message: 'Estado requerido'
                    }
                })}
                disabled={false}
                placeholder="State"
                variant="outlined"
            />
          </div>
          <div>
            <button type='submit' className={`${style['SubmitButton']}`}>Guardrar</button>
          </div>
        </form>
        <Snackbar open={openOneSnackbar.open} autoHideDuration={3000} onClose={() => {setOpenOneSnackbar({ snackbarMessage:'',snackbarSeverity: '', open:false })}} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
            <Alert severity={openOneSnackbar.snackbarSeverity as AlertColor} onClose={() => {setOpenOneSnackbar({ snackbarMessage:'',snackbarSeverity: '', open:false })}} sx={{ width: '100%' }} variant='filled'>
                {openOneSnackbar.snackbarMessage}
            </Alert>
        </Snackbar>
      </div>
      }
      
    </div>
  );
};

export default FormBilling;
