import React from 'react';
import { FooterMain, HeaderMain, Button } from "../shared";

interface CartPageProps{
}
export function CartPage(props:CartPageProps){
  return(
    <div className="cart">
      <HeaderMain />
      <sub-header class="cart-title">Your cart</sub-header>
      <cart>
        <column-top>
          <column-title>Product</column-title>
          <column-title>Price</column-title>
          <column-title>Quantity</column-title>
          <column-title>Total</column-title>
        </column-top>
        <cart-product> {/*This will be a component*/}
          <cart-image />
          <cart-details>
            <product-title>White Dot</product-title>
            <product-style>Style: Twist</product-style>
            <Button class="remove">Remove</Button>
          </cart-details>
        </cart-product>
      </cart>
      <FooterMain />
    </div>
  );
}