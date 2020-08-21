import React from 'react';
import './App.css';
import './bizzyclone.css';

/* === Types (Upper CamelCase) === */

declare global{
  namespace JSX {
    interface IntrinsicElements {
      [key:string]: any
    }
  }
}

interface Cart{
  itemCount: number,
  total: number,
  products: Product[]
}

interface User{
  email: string,
  password: string, /* lol */
  wishlist: Product[],
  review: Review[]
}

interface Product{
  title: string,
  price: number,
  source: string,
  category: Category[],
  featured?: boolean,
  instock?: boolean,
  reviewCount?: number,
  reviewAverage?: number,
  review?: Review[]
}

interface Review{
  rating: number,
  date: Date
  title: string,
  body: string
  user: User
}

interface Category{
  type: string,
  title: string,
  source: string,
  product: Product[],
}

let myProduct:Product = {
  title: "Magic",
  price: 15.00,
  source: "asdf",
  category: []
}

let myCategory:Category = {
  title: "Category",
  type: "Collection",
  source: "Source",
  product: [myProduct, {title: "drinking-water", price: 9999, source: "mother-earth", category: []}]
}

let products:Product[] = [];
  
/*
{
  source: "http://placekitten.com/901/901",
  title: "Leaf Scarf Tie",
  price: 15.00,
},
{
  source: "http://placekitten.com/902/902",
  title: "Fuschia Scarf Tie",
  price: 15.00,
},
{
  source: "http://placekitten.com/903/903",
  title: "Turquoise Scarf Tie",
  price: 15.00,
},
{
  source: "http://placekitten.com/904/904",
  title: "Retro Dot Scarf Tie",
  price: 15.00,
},
{
  source: "http://placekitten.com/905/905",
  title: "Ikat Scarf Tie",
  price: 15.00,
},
{
  source: "http://placekitten.com/906/906",
  title: "Kelly Green",
  price: 15.00,
},
{
  source: "http://placekitten.com/907/907",
  title: "Peach",
  price: 15.00,
}*/

/* === Functions === */

function App() {

  let product_elements = [];
  
  for(let product of products){
    product_elements.push(<Product {...product} />);
  }

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


function Product(props:Product){
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

/* === Constructors === */

function make_product(title:string, price:number, source:string,
  categories:Category[] = [], instock?:boolean, featured?:boolean):Product{
  
  let product:Product = {title, price, source, category: categories, featured, instock};
  
  for(let category of categories){
    category.product.push(product);
  }

  products.push(product);
  return product;
}

function make_category(type:string, title:string, source:string, products:Product[] = []){

  let category:Category = {type, title, source, product: products};

  for(let product of products){
    product.category.push(category);
  }

  //push to a list of categories when needed
  return category;
}

let neon_pink = make_product("Neon Pink", 15.00, "http://placekitten.com/900/900");
let leaf_scarf_tie = make_product("Leaf Scarf Tie", 15.00, "http://placekitten.com/901/901");
let fuschia_scarf_tie = make_product("Fuschia Scarf Tie", 15.00, "http://placekitten.com/902/902");
let turquoise_scarf_tie = make_product("Turquoise Scarf Tie", 15.00, "http://placekitten.com/903/903");
let retro_dot_scarf_tie = make_product("Retro Dot Scarf Tie", 15.00, "http://placekitten.com/904/904");
let ikat_scarf_tie = make_product("Ikat Scarf Tie", 15.00, "http://placekitten.com/905/905");
let kelly_greem = make_product("Kelly Green", 15.00, "http://placekitten.com/906/906");
let peach = make_product("Peach", 15.00, "http://placekitten.com/907/907");

console.log(make_category("Scarf Tie", "Scarf Tie", "url", [leaf_scarf_tie, fuschia_scarf_tie, turquoise_scarf_tie, retro_dot_scarf_tie, ikat_scarf_tie]));

export default App;
