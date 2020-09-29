import React from 'react';
import { Product, Category, db } from '../data';
import { HeaderMain, Gallery, FooterMain} from "../shared";


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

interface ProductHomeProps{
  product: Product
}

export function ProductHome(props: ProductHomeProps) {
  let product = props.product;
  let source = product.pictures[0] || "http://placekitten.com/900/900";

  return (
    <a href = {`#product/${db.products.indexOf(product)}`} className = "product">
      <product-image source={source} style={{ backgroundImage: `url(${source})` }} class="image product-home-image" />
      <product-title>{product.title || "Neon Pink"}</product-title>
      <product-price>{product.price || "$15.00"}</product-price>
      <ion-icon name="heart-half" class="favorite-heart"></ion-icon>
    </a>
  );
}

interface CategoryIconProps{
  category: Category
}

export function CategoryIcon(props: CategoryIconProps) {
  let category = props.category;
  let source = category.source || "http://placekitten.com/890/890";

  return (
    <a href = {`#category/${db.categories.indexOf(category)}`} className = "category">
      <category-image source={source} style={{ backgroundImage: `url(${source})` }} class="image"></category-image>
      <category-text>{category.title || "Category Text"}</category-text>
    </a>
  );
}

export function Instagram() {
  return (
    <instagram>
      <insta-image source="http://placekitten.com/901/901" style={{ backgroundImage: `url('http://placekitten.com/901/901')` }} class="image"></insta-image>
      <ion-icon name="logo-instagram" class="insta-logo"></ion-icon>
    </instagram>
  );
}

let product_elements:JSX.Element[] = [];

for(let product of db.products){
  product_elements.push(<ProductHome product = {product} />);
}

export let category_elements:JSX.Element[] = [];

for(let category of db.categories){
  category_elements.push(<CategoryIcon category = {category} />);
}