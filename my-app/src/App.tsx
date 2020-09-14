import React, { Children } from 'react';
import './bizzyclone.css';
import { ReactComponent } from '*.svg';
import {Product, make_product, make_category, products, categories, testProductCategories} from './data';
import { ProductHome } from './HomePage/HomePage';
import { ProductPage, testProductPageProps } from './ProductPage/ProductPage';
import { CategoryIcon } from './shared';

declare global{
  namespace JSX {
    interface IntrinsicElements {
      [key:string]: any
    }
  }
}

function App() {
  return (
    <div className="App">
      <ProductPage {...testProductPageProps} />
    </div>
  );
};

export default App;
