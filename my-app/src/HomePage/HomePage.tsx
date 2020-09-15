import React from 'react';
import { Product, products, categories } from '../data';
import { HeaderMain, Gallery, FooterMain, CategoryIcon } from "../shared";


export function HomePage(props: any) {
  return (
    <div className="Home">
      <HeaderMain />
      <hero class="hero">
        <h1 className="page-title">Welcome to Bizzybcrafts</h1>
        <h2 className="page-subtitle">My goal is to make the busy woman feel put together with the addition of just one accessory.</h2>
        <cta>Shop Summer Collection</cta>
      </hero>
      <content class="upper-content">
        <center-wrapper>
          <Gallery title="Summer Collection">{product_elements}</Gallery>
          <Gallery title="Shop by Style">{category_elements}</Gallery>
          <Gallery title="Insta Feed"><Instagram /><Instagram /><Instagram /><Instagram /></Gallery>
        </center-wrapper>
      </content>
      <FooterMain />
    </div>
  );
}

export function ProductHome(props: Product) {
  let source = props.source || "http://placekitten.com/900/900";

  return (
    <product>
      <product-image source={source} style={{ backgroundImage: `url(${source})` }} class="image product-home-image"></product-image>
      <product-title>{props.title || "Neon Pink"}</product-title>
      <product-price>{props.price || "$15.00"}</product-price>
      <ion-icon name="heart-half" class="favorite-heart"></ion-icon>
    </product>
  );
}

function Instagram() {
  return (
    <instagram>
      <insta-image source="http://placekitten.com/901/901" style={{ backgroundImage: `url('http://placekitten.com/901/901')` }} class="image"></insta-image>
      <ion-icon name="logo-instagram" class="insta-logo"></ion-icon>
    </instagram>
  );
}

let product_elements:JSX.Element[] = [];

for(let product of products){
  product_elements.push(<ProductHome {...product} />);
}

export let category_elements:JSX.Element[] = [];

for(let category of categories){
  category_elements.push(<CategoryIcon {...category} />);
}