import { render } from '@testing-library/react';
import React from 'react';
import { Category, Product, db} from '../data';
import { HeaderMain, OptionProps, Dropdown, Gallery, FooterMain } from "../shared";

interface CategoryPageProps {
  category: Category
}
interface CategoryPageState{
  selected: Order
}
type Order = "title-descending" | "title-ascending" | "price-descending" | "price-ascending" | "created-descending" | "created-ascending";

export class CategoryPage extends React.Component<CategoryPageProps>{
  state:CategoryPageState = {
    selected: "title-descending"
  }

  update_selected = (value:string) => {
    console.log(value);
    this.setState({selected:value});
  }

  compare_alphabetically(a:Product, b:Product):number{
    if(a.title < b.title){
      return -1;
    }else if(a.title > b.title){
      return 1;
    }else{
      return 0;
    }
  }
  
  compare_price(a:Product, b:Product):number{
    let a_num = db.price_to_number(a.price);
    let b_num = db.price_to_number(b.price);

    return b_num - a_num;
  }

  compare_date(a:Product, b:Product):number{
    return b.date.getTime() - a.date.getTime();
  }

  sort_products(array:Product[], order:Order):Product[]{
    let sort_type = {
      "title-descending": this.compare_alphabetically,
      "title-ascending": this.compare_alphabetically,
      "price-descending": this.compare_price,
      "price-ascending": this.compare_price,
      "created-descending": this.compare_date,
      "created-ascending": this.compare_date
    }

    if(order.endsWith("-descending")){
      return array.slice().sort(sort_type[order]);
    }else{
      return array.slice().sort(sort_type[order]).reverse();
    }
  }

  render(){
    let category_sort: OptionProps[] = [/*
      { value: "featured", text: "Featured", selected: false },
      { value: "best-selling", text: "Best selling", selected: true },*/
      { value: "title-descending", text: "Alphabetically, A-Z", selected: false },
      { value: "title-ascending", text: "Alphabetically, Z-A", selected: false },
      { value: "price-descending", text: "Price, high to low", selected: false },
      { value: "price-ascending", text: "Price, low to high", selected: false },
      { value: "created-descending", text: "Date, new to old", selected: false },
      { value: "created-ascending", text: "Date, old to new", selected: false }
    ];
    let selected:string = this.state.selected;
    let category:Category = this.props.category;
    let sorted_products = this.sort_products(category.product, this.state.selected);
    let product_sort_elements: JSX.Element[] = [];
  
    for (let product of sorted_products) {
      product_sort_elements.push(<ProductSort product={product} category={category} />);
    }
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
