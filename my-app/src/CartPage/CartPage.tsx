import React from 'react';
import { FooterMain, HeaderMain, Button, SizeWrapper } from "../shared";

interface CartPageProps{
}
export function CartPage(props:CartPageProps){
  return(
    <div className="cart">
      <HeaderMain />
        <sub-header class="cart-title">Your cart</sub-header>
        <SizeWrapper>
          <cart>
            <cart-top>
              <column-title>Product</column-title>
              <column-title>Price</column-title>
              <column-title>Quantity</column-title>
              <column-title>Total</column-title>
              <CartItem />
              <CartItem />
            </cart-top>
            <cart-bottom>
              <order-notes>
                <note-title>Add a note to your order</note-title>
                <note-box>
                  This is how text will appear in the note box.
                </note-box>
              </order-notes>
              <spacer />
              <checkout>
                <subtotal>
                  <subtotal-title>Subtotal</subtotal-title>
                  <subtotal-number>$30.00</subtotal-number>
                </subtotal>
                <pricing-info>Taxes and <a className="shipping">shipping</a> calculated at checkout</pricing-info>
                <button-group>
                  <Button class="continue-shopping light">Continue Shopping</Button>
                  <Button class="update light">Update</Button>
                  <Button class="checkout dark">Checkout</Button>
                </button-group>
              </checkout>
            </cart-bottom>
          </cart>
        </SizeWrapper>
      <FooterMain />
    </div>
  );
}

interface CartItemProps{
}
function CartItem(props:CartItemProps){
  return(
    <cart-item>
      <item-image style={{backgroundImage: `url('http://placekitten.com/901/901')`}} />
      <item-details>
        <a className="item-title" href="">White Dot</a>
        <item-style>Style: Twist</item-style>
        <Button class="remove">Remove</Button>
      </item-details>
      <item-price>$15.00</item-price>
      <input className="item-quantity" type = "number" value="1"/>
      <item-total>$15.00</item-total>
    </cart-item>
  );
}