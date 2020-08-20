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

let products:Product[] = [
  /*make_product("Neon Pink", 15.00, "http://placekitten.com/900/900"),
  
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
},  */
];

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


export default App;
