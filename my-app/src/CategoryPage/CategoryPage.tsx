import { render } from '@testing-library/react';
import React from 'react';
import { Category, Product, db} from '../data';
import { HeaderMain, OptionProps, Dropdown, Gallery, FooterMain } from "../shared";

interface CategoryPageProps {
  category: Category
}
interface CategoryPageState{
  selected: string
}
export class CategoryPage extends React.Component<CategoryPageProps>{
  state:CategoryPageState = {
    selected: "title-descending"
  }

  update_selected = (value:string) => {
    console.log(value);
    this.setState({selected:value});
  }

  render(){
    let category_sort: OptionProps[] = [/*
      { value: "featured", text: "Featured", selected: false },
      { value: "best-selling", text: "Best selling", selected: true },*/
      { value: "title-ascending", text: "Alphabetically, A-Z", selected: false },
      { value: "title-descending", text: "Alphabetically, Z-A", selected: false },
      { value: "price-ascending", text: "Price, low to high", selected: false },
      { value: "price-descending", text: "Price, high to low", selected: false },
      { value: "created-ascending", text: "Date, old to new", selected: false },
      { value: "created-descending", text: "Date, new to old", selected: false }
    ];
    let selected:string = this.state.selected;
    let category:Category = this.props.category;
    let product_sort_elements: JSX.Element[] = [];
  
    for (let product of category.product) {
      product_sort_elements.push(<ProductSort product={product} category={category} />);
    }
  
    console.log(category.product);

  return(
      <div>
        <HeaderMain />
        <subheader className="subheader-category">
          <subheader-title className="category-page-title">{category.title}</subheader-title>
          <sort>
            <size-wrapper className="category-position">
              <filter-select>
                <filter-title>Sort By</filter-title>
                <Dropdown class="drop-category" selected={selected} onChanged={this.update_selected}>{category_sort}</Dropdown>
              </filter-select>
              <filter-count>{category.product.length} products</filter-count>
            </size-wrapper>
          </sort>
        </subheader>
        <content class="upper-content">
          <center-wrapper>
            <Gallery>{product_sort_elements}</Gallery>
          </center-wrapper>
        </content>
        <FooterMain />
      </div>
    );
  }
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
