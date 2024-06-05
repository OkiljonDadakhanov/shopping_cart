import React, { useState, useEffect } from 'react';
import CartItem from './CartItem';
import CardDetails from './CardDetails';
import { getCartItems, calculateTotal, addOrder } from '../products';

const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [quantities, setQuantities] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const fetchCartItems = async () => {
      const items = await getCartItems();
      setCartItems(items);
      setQuantities(items.map(() => 1));
      const { total } = calculateTotal(items);
      setTotalPrice(total);
    };

    fetchCartItems();
  }, []);

  const handleQuantityChange = (id, delta) => {
    const index = cartItems.findIndex(item => item.id === id);
    const newQuantity = Math.max(quantities[index] + delta, 1);
    setQuantities(prevQuantities => {
      const newQuantities = [...prevQuantities];
      newQuantities[index] = newQuantity;
      return newQuantities;
    });

    setTotalPrice(prevTotalPrice => {
      return prevTotalPrice + (newQuantity - quantities[index]) * cartItems[index].price;
    });
  };

  const handleRemoveItem = (id) => {
    const index = cartItems.findIndex(item => item.id === id);
    setCartItems(prevCartItems => prevCartItems.filter((_, i) => i !== index));
    setQuantities(prevQuantities => prevQuantities.filter((_, i) => i !== index));
    setTotalPrice(prevTotalPrice => prevTotalPrice - cartItems[index].price * quantities[index]);
  };

  const handleCheckout = async () => {
    const order = {
      items: cartItems,
      total: totalPrice,
      date: new Date().toISOString(),
    };
    await addOrder(order);
    alert('Success!');
  };

  return (
    <div className="flex justify-center items-start h-screen">
      <div className="w-1/2 p-8">
        <h3 className="text-2xl font-bold mb-2">Shopping cart</h3>
        {cartItems.length > 0 ? (
          <>
            <p className="text-gray-500 mb-4">You have {cartItems.length} items in your cart</p>
            <div className="space-y-4">
              {cartItems.map((product, index) => (
                <CartItem
                  key={product.id}
                  item={product}
                  quantity={quantities[index]}
                  onQuantityChange={handleQuantityChange}
                  onRemove={handleRemoveItem}
                />
              ))}
            </div>
            <div className="mt-4 text-right">
              <p className="text-gray-700 font-bold">Total: ${totalPrice.toFixed(2)}</p>
            </div>
          </>
        ) : (
          <p className="text-gray-500 mb-4">You have currently no items</p>
        )}
      </div>
      <div className="w-1/2 bg-gray-100 p-8">
        <CardDetails />
        <button
          onClick={handleCheckout}
          className="bg-green-500 text-white px-4 py-2 rounded mt-4"
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default ShoppingCart;
