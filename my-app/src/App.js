import React from 'react';
import logo from './logo.svg';
import './App.css';
import './bizzyclone.css';

let products = [
  {
    source: "http://placekitten.com/900/900",
    title: "Neon Pink",
    price: "15.00",
  },
  {
    source: "http://placekitten.com/940/940",
    title: "Hollistic Medicine",
    price: "1500.00",
  },
  {
    source: "http://placekitten.com/900/900",
    title: "Neon Pink",
    price: "15.00",
  },
  {
    source: "http://placekitten.com/940/940",
    title: "Hollistic Medicine",
    price: "1500.00",
  },
  {
    source: "http://placekitten.com/900/900",
    title: "Neon Pink",
    price: "15.00",
  },
  {
    source: "http://placekitten.com/940/940",
    title: "Hollistic Medicine",
    price: "1500.00",
  },
  {
    source: "http://placekitten.com/900/900",
    title: "Neon Pink",
    price: "15.00",
  },
  {
    source: "http://placekitten.com/940/940",
    title: "Hollistic Medicine",
    price: "1500.00",
  },  
];

function App() {
  let product_elements = [];
  
  for(let product of products){
    product_elements.push( <Product {...product} />);
  }

  console.log(product_elements);

  return (
    <div className="App">
      <content class = "upper-content">
        <center-wrapper>
          <summer-collection>
            <section-title>Summer Collection</section-title>
            <product-row>
              
              {/*<Product
                source = "http://placekitten.com/930/930"
                title = "Cute Cat"
                price = "20.00"
              />
              <Product {...products[1]}
              />*/}
              {product_elements}
            </product-row>
          </summer-collection>
        </center-wrapper>
      </content>
    </div>
  );
};


function Product(props){
  let source = props.source || "http://placekitten.com/900/900";

  return(
  <product>
    <product-image source = {source} style = {{backgroundImage: `url(${source})`}} class = "image"></product-image>
    <product-title>{props.title || "Neon Pink"}</product-title>
    <product-price>${props.price || "15.00"}</product-price>
    <ion-icon name="heart-half" class = "favorite-heart"></ion-icon>
  </product>
  );
}



export default App;
