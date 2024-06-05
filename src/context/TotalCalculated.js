import React, { createContext, useContext, useState, useEffect } from 'react';
import { getItemsFromCart, getShippingPrice } from '../utils/indexedDB';

const TotalCalculated = createContext();

export const useTotal = () => useContext(TotalCalculated);

export const TotalProvider = ({ children }) => {
    const [subtotal, setSubtotal] = useState(0);
    const [shipping, setShipping] = useState(0);
    

    useEffect(() => {
        const fetchCartData = async () => {
            const items = await getItemsFromCart();
            const shippingPrice = await getShippingPrice();
            setShipping(shippingPrice);
            calculateSubtotal(items);
        };

        fetchCartData();
  }, []);

    const calculateSubtotal = (items) => {
        const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
        setSubtotal(total);
    };

    const total = subtotal + shipping;

    return (
        <TotalCalculated.Provider value={{ subtotal, setSubtotal, shipping, setShipping, total }}>
            {children}
        </TotalCalculated.Provider>
    );
};
