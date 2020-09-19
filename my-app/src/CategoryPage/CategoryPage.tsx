import React from 'react';
import { Category, Product, db} from '../data';
import { HeaderMain, HeaderCategory, Gallery, FooterMain } from "../shared";

interface CategoryPageProps {
  category: Category;
}
export function CategoryPage(props: CategoryPageProps) {
  let category = props.category;
  let product_sort_elements: JSX.Element[] = [];

  for (let product of category.product) {
    product_sort_elements.push(<ProductSort product={product} category={category} />);
  }

  console.log(category.product);

  return (
    <div>
      <HeaderMain />
      <HeaderCategory {...category} />
      <content class="upper-content">
        <center-wrapper>
          <Gallery>{product_sort_elements}</Gallery>
        </center-wrapper>
      </content>
      <FooterMain />
    </div>
  );
}

interface ProductSortProps{
  category: Category,
  product: Product
}

export function ProductSort(props:ProductSortProps){
  let source = props.product.pictures[0] || "http://placekitten.com/900/900";

  return(
  <a href = {`#product/${db.products.indexOf(props.product)}`} className = "product">
    <product-image source = {source} style = {{backgroundImage: `url(${source})`}} class = "image product-sort-image"></product-image>
    <product-title class = "product-sort-title">{props.product.title || "Neon Pink"} | {props.category.title}</product-title>
    <review-stars>
      <ion-icon name="star" />
      <ion-icon name="star" />
      <ion-icon name="star" />
      <ion-icon name="star" />
      <ion-icon name="star" />
      <review-count>{props.product.reviewCount || "100"} reviews</review-count>
    </review-stars>
    <product-price>{props.product.price || "Sold Out"}</product-price>
  </a>
  );
}
