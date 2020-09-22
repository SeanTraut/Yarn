import React from 'react';
import { FooterMain, HeaderMain } from "../shared";

interface CartPageProps{

}
export function CartPage(props:CartPageProps){
  return(
    <div className="cart">
      <HeaderMain />
      <sub-header class="cart-header">
        Your cart
      </sub-header>
      <cart>
        
      </cart>
      <FooterMain />
    </div>
  );
}