import React, { Children } from 'react';
import './bizzyclone.css';
import { ReactComponent } from '*.svg';
import {Product, Category, make_product, make_category, products, categories, testProductCategories, testProduct, scarf_ties } from './data';
import { HomePage } from './HomePage/HomePage';
import { CategoryPage } from './CategoryPage/CategoryPage';
import { ProductPage } from './ProductPage/ProductPage';
import { CategoryIcon } from './shared';

declare global{
  namespace JSX {
    interface IntrinsicElements {
      [key:string]: any
    }
  }
}

interface AppState{
  page: "HomePage" | "CategoryPage" | "ProductPage",
  product: Product,
  category: Category
}

class App extends React.Component<{}> {
  state: AppState = {
    page: "CategoryPage",
    product: testProduct,
    category: scarf_ties
  }

  render(){
    let content;
    if (this.state.page === "HomePage"){
      content = <HomePage />;
    }else if(this.state.page === "ProductPage"){
      content = <ProductPage product = {this.state.product} />;
    }else if(this.state.page === "CategoryPage"){
      content = <CategoryPage category = {this.state.category}/>;
    }else{
      content = <div>404: Page Not Found</div>
    }

    return (
      <div className="App">
        {content}
      </div>
    );
  };
};

export default App;
