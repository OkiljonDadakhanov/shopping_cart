import React from "react";

const ShoppingCart = () => {
  return (
    <>
      <div className="container">
        <h3>Shopping cart</h3>
        <p>You have 3 item in your cart</p>
        <div className="items">
          <div className="item">
            <img src="" alt="" />
            <h3 className="item__name">Italy Pizza</h3>
            <p className="item__desc">Extra cheese and toping</p>
            
          </div>
        </div>
      </div>
    </>
  );
};

export default ShoppingCart;
