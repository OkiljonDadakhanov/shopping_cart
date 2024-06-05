import top from "../assets/top.png";
import bottom from "../assets/bottom.png";
import removeFood from "../assets/delete.png";

import { products } from "../products";
import { useState } from "react";

const ShoppingCart = () => {
  const [quantities, setQuantities] = useState(products.map(() => 1));
  const [totalPrice, setTotalPrice] = useState(
    products.reduce((total, product) => total + product.price, 0)
  );
  const [cartItems, setCartItems] = useState(products);

  const handleQuantityChange = (index, delta) => {
    const newQuantity = Math.max(quantities[index] + delta, 1);
    setQuantities((prevQuantities) => {
      const newQuantities = [...prevQuantities];
      newQuantities[index] = newQuantity;
      return newQuantities;
    });

    setTotalPrice((prevTotalPrice) => {
      return prevTotalPrice + (newQuantity - quantities[index]) * products[index].price;
    });
  };

  const handleRemoveItem = (index) => {
    setCartItems((prevCartItems) => prevCartItems.filter((_, i) => i !== index));
    setQuantities((prevQuantities) => prevQuantities.filter((_, i) => i !== index));
    setTotalPrice((prevTotalPrice) => prevTotalPrice - products[index].price * quantities[index]);
  };

  return (
    <div className="container mx-auto my-8">
      <h3 className="text-2xl font-bold mb-2">Shopping cart</h3>
      <p className="text-gray-500 mb-4">You have {cartItems.length} items in your cart</p>
      <div className="space-y-4">
        {cartItems.map((product, index) => (
          <div
            key={product.id}
            className="flex items-center bg-white shadow-md rounded-lg p-4"
          >
            <div className="w-24 h-24 flex-shrink-0">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="ml-4 flex-1">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-bold">{product.name}</h3>
                  <p className="text-gray-500">{product.description}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleQuantityChange(index, 1)}
                    className="bg-gray-200 p-1 rounded"
                  >
                    <img src={top} alt="" className="w-4 h-4" />
                  </button>
                  <span className="text-gray-700">{quantities[index]}</span>
                  <button
                    onClick={() => handleQuantityChange(index, -1)}
                    className="bg-gray-200 p-1 rounded"
                  >
                    <img src={bottom} alt="" className="w-4 h-4" />
                  </button>
                  <p className="text-gray-700 font-bold">
                    ${product.price * quantities[index]}
                  </p>
                  <button onClick={() => handleRemoveItem(index)} className="cursor-pointer">
                    <img src={removeFood} alt="" className="w-6 h-6" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 text-right">
        <p className="text-gray-700 font-bold">Total: ${totalPrice.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default ShoppingCart;