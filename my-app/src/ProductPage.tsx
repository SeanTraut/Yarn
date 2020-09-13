import React from 'react';
import { Product, testProduct } from './data';
import { OptionProps, HeaderMain, Dropdown, Button, FooterMain } from "./shared";
interface ProductPageProps {
  product: Product;
}
export let testProductPageProps: ProductPageProps = {
  product: testProduct
};
export function ProductPage(props: ProductPageProps) {
  let style_sort: OptionProps[] = [];

  for (let cat of props.product.category) {
    style_sort.push({ value: cat.type, text: cat.title, selected: false });
  }

  return (
    <div>
      <HeaderMain />
      <content class="upper-content">
        <center-wrapper>
          <product-page>
            <vertical-half>
              <image-box>
                <focus-image />
              </image-box>
              <image-select>
                <image-option />
                <image-option />
                <image-option />
                <image-option />
                <image-option />
                <image-option />
                <image-option />
                <image-option />
                <image-option />
              </image-select>
            </vertical-half>
            <vertical-half>
              <product-header>{props.product.title}</product-header>
              <review-info>
                <review-stars>
                  <ion-icon name="star" />
                  <ion-icon name="star" />
                  <ion-icon name="star" />
                  <ion-icon name="star" />
                  <ion-icon name="star-outline" />
                </review-stars>
                <review-count>&nbsp;{props.product.reviewCount}</review-count>
              </review-info>
              <price>{props.product.price}</price>
              <shipping-details><a href="">Shipping</a>&nbsp;calculated at checkout.</shipping-details>
              <product-type>
                <type-title>Style</type-title>
                <Dropdown class="style">{style_sort}</Dropdown>
              </product-type>
              <Button class="add-to-cart">Add to Cart</Button>
              <Button class="g-pay">
                <text>Buy with&nbsp;</text>
                <i className="fab fa-google-pay" />
              </Button>
              <Button class="payment-options">More payment options</Button>
              <Button class="add-to-wishlist">
                <box>
                  <i className="far fa-heart" />
                  <text>Add to Wishlist</text>
                </box>
                <count>48</count>
              </Button>
              <product-blurb>
                {props.product.description}
              </product-blurb>
              <product-details>
                <details-title>Details</details-title>
                <details-subtitle>Wraps</details-subtitle>
                <ul>
                  <li>Measures 19 inches unstretched</li>
                  <li>Elastic at the back is covered in fabric to help it stretch to your size</li>
                  <li>Wide wrap is 6.5 inches wide vs. wrap is 3.5 inches wide</li>
                </ul>
                <details-subtitle>Tie / Wide Tie</details-subtitle>
                <ul>
                  <li>Measures 27 inches unstretched</li>
                  <li>Can be untied and loosened to fit your specific head size</li>
                  <li>Can be worn with the tie in the front or the back</li>
                  <li>Wide tie is 4 inches wide vs. tie is 2 inches wide</li>
                </ul>
                <details-subtitle>Twist</details-subtitle>
                <ul>
                  <li>Measures 19 inches unstretched</li>
                  <li>Can be worn twisted or untwisted</li>
                  <li>2.5 inches wide</li>
                </ul>
              </product-details>
            </vertical-half>
          </product-page>
        </center-wrapper>
      </content>
      <FooterMain />
    </div>
  );
}
