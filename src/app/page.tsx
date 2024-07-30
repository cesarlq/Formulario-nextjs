"use client";
import Image from "next/image";
import FormBilling from './Components/Form';
import style from '@/Styles/Form.module.scss';
import { Provider } from 'react-redux';
import { store } from '@redux/store';

export default function Home() {
  
  return (
    <>
    <Provider store={store}>
      <main className={`${style['container']}`}>
        <FormBilling />
      </main>
    </Provider>
    </>
  );
}
