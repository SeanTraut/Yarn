import React from 'react';
import { db, Product } from '../data';
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
              <CartItem product = {db.cart?.products[0]} />
            </cart-top>
            <cart-bottom>
              <order-notes>
                <note-title>Add a note to your order</note-title>
                <textarea className="note-box">
                  {db.cart?.note || "This is how text will appear in the note box."}
                </textarea>
              </order-notes>
              <spacer />
              <checkout>
                <subtotal>
                  <subtotal-title>Subtotal</subtotal-title>
                  <subtotal-number>{db.cart?.subtotal || "$0.00"}</subtotal-number>
                </subtotal>
                <pricing-info>Taxes and <a className="shipping" href="">shipping</a> calculated at checkout</pricing-info>
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
  product: Product | undefined;
}

function CartItem(props:CartItemProps){
  return(
    <cart-item>
      <item-image style={{backgroundImage: `url(${props.product?.pictures[0]})`}} />
      <item-details>
        <a className="item-title" href="">{props.product?.title}</a>
        <item-style>Style: {props.product?.category}</item-style>
        <Button class="remove">Remove</Button>
      </item-details>
      <item-price>{props.product?.price}</item-price>
      <input className="item-quantity" type = "number" value="1"/>
      <item-total>{}</item-total>
    </cart-item>
  );
}