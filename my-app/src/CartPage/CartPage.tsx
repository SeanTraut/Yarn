import React from 'react';
import { db, Cart, CartItem } from '../data';
import { FooterMain, HeaderMain, Button, SizeWrapper } from "../shared";

interface CartPageProps{
  cart: Cart
}
export function CartPage(props:CartPageProps){
  let items = props.cart.cartitems;
  let elements:JSX.Element[] = [];
  
  for(let item of items){
    elements.push(<CartItemRow cartitem = {item}/>);
  }

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
              {elements}
            </cart-top>
            <cart-bottom>
              <order-notes>
                <note-title>Add a note to your order</note-title>
                <textarea className="note-box">
                  {props.cart?.note || "This is how text will appear in the note box."}
                </textarea>
              </order-notes>
              <spacer />
              <checkout>
                <subtotal>
                  <subtotal-title>Subtotal</subtotal-title>
                  <subtotal-number>{db.calculate_cart_subtotal(props.cart)}</subtotal-number>
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

interface CartItemRowProps{
  cartitem: CartItem
}
function CartItemRow(props:CartItemRowProps){
  let product = props.cartitem.product;
  let quantity = props.cartitem.quantity;

  return(
    <cart-item>
      <item-image-wrapper>
        <item-image style={{backgroundImage: `url(${product.pictures[0]})`}} />
      </item-image-wrapper>
      <item-details>
        <a className="item-title" href="">{product.title}</a>
        <item-style>Style: {props.cartitem.style}</item-style>
        <Button class="remove" onClick={() => db.remove_from_cart(props.cartitem)}>Remove</Button>
      </item-details>
      <item-price>{product.price}</item-price>
      <item-quantity-wrapper>
        <input className="item-quantity" type = "number" value={quantity}
          onChange={(event:React.SyntheticEvent<HTMLInputElement>) => db.update_item_quantity(props.cartitem, +event.currentTarget.value)}
        />
      </item-quantity-wrapper>
      <item-total>{db.calculate_item_total(product.price, quantity)}</item-total>
    </cart-item>
  );
}