import React from 'react';

const CartItem = ({ item, quantity, onQuantityChange, onRemove }) => {
  return (
    <div className="flex items-center bg-white shadow-md rounded-lg p-4">
      <div className="w-24 h-24 flex-shrink-0">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="ml-4 flex-1">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-bold">{item.name}</h3>
            <p className="text-gray-500">{item.description}</p>
          </div>
          <div className="flex items-center gap-5">
            <button
              onClick={() => onQuantityChange(item.id, 1)}
              className="bg-gray-200 p-1 rounded"
            >
              <img src="/images/top.png" alt="Increase" className="w-4 h-4" />
            </button>
            <span className="text-gray-700">{quantity}</span>
            <button
              onClick={() => onQuantityChange(item.id, -1)}
              className="bg-gray-200 p-1 rounded"
            >
              <img src="/images/bottom.png" alt="Decrease" className="w-4 h-4" />
            </button>
            <p className="text-gray-700 font-bold">
              ${item.price * quantity}
            </p>
            <button onClick={() => onRemove(item.id)} className="cursor-pointer">
              <img src="/images/delete.png" alt="Remove" className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
