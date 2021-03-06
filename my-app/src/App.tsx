import React/*, { Children }*/ from 'react';
import './bizzyclone.css';
//import { ReactComponent } from '*.svg';
import {Product, Category, db} from './data';
import { HomePage } from './HomePage/HomePage';
import { CategoryPage } from './CategoryPage/CategoryPage';
import { ProductPage } from './ProductPage/ProductPage';
import { CartPage } from './CartPage/CartPage';

declare global{
  namespace JSX {
    interface IntrinsicElements {
      [key:string]: any
    }
  }
}

export let app:App | undefined = undefined;

export function rerender(){
  if(app){
    app.forceUpdate();
  };
}

db.rerender = rerender;

interface AppState{
  page: string,
  product: Product,
  category: Category
}

class App extends React.Component<{}> {
  state: AppState = {
    page: "category",
    product: db.products[0],
    category: db.categories[0]
  };

  hash_changed = () => {
    let url = window.location.hash.slice(1);
    console.log(url);

    let [page, index] = url.split("/");

    if(!page) return;
    
    let new_state = {...this.state, page: page};

    if(page === "product"){
      if(isNaN(+index)) return;
      new_state.product = db.products[+index];
    }else if(page === "category"){
      if(isNaN(+index)) return;
      new_state.category = db.categories[+index];
    }

    this.setState(new_state);
  };

  componentDidMount(){
    window.addEventListener("hashchange", this.hash_changed);
    this.hash_changed();

    app = this;
  };

  render(){
    let content;
    if (this.state.page === "home"){
      content = <HomePage />;
    }else if(this.state.page === "product"){
      content = <ProductPage product = {this.state.product} />;
    }else if(this.state.page === "category"){
      content = <CategoryPage category = {this.state.category}/>;
    }else if(this.state.page === "cart"){
      content = <CartPage cart = {db.cart} />;
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
