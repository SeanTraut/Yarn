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
let categories:Category[] = [];
let open_category:Category|undefined;

/* === Functions === */

function App() {

  if(open_category){
    return (
      <div className="App">
        <CategoryPage category = {open_category}/>
      </div>
    );
  }else{
    return(
      <div className="App">
        <HomePage />
      </div>
    );
  }
};

/* === Components === */

function Header(){
  return(
    <header>
      <announcement-bar>
          <bar-message>Order processing time is 1 week. Check out the FAQ tab below.</bar-message>
      </announcement-bar>
      <site-header>
          <img src = "http://placekitten.com/160/95" className = "logo" />
          <spacer></spacer>
          <nav>
              <ul>
                  <li className = "nav-item"><nav-text>Home</nav-text></li>
                  <li className = "nav-item">
                      <nav-text>Shop</nav-text>
                      <dropdown-icon>
                          <ion-icon name="chevron-down"></ion-icon>
                      </dropdown-icon>
                  </li>
                  <li className = "nav-item">
                      <nav-text>About</nav-text>
                      <dropdown-icon>
                          <ion-icon name="chevron-down"></ion-icon>
                      </dropdown-icon>
                  </li>
                  <li className = "nav-item"><nav-text>FAQs</nav-text></li>
                  <li className = "nav-item"><nav-text>Contact</nav-text></li>
                  <li className = "nav-item"><nav-text>Launch/Restock Info</nav-text></li>
              </ul>
          </nav>
          <spacer></spacer>
          <controls>
              <ion-icon name="search" class = "search"></ion-icon>
              <ion-icon name="person" class = "profile"></ion-icon>
              <cart class = "bag">
                  <ion-icon name="lock-closed" class = "bag-icon"></ion-icon>
                  <icon-data class = "bag-count">0</icon-data>
              </cart>
          </controls>
      </site-header>
    </header>
  );
}

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

function Category(props:Category){
  let source = props.source || "http://placekitten.com/890/890";
  
  console.log(props);

  return(
  <category>
    <category-image source = {source} style = {{backgroundImage: `url(${source})`}} class = "image"></category-image>
    <category-text>{props.title || "Category Text"}</category-text>
  </category>
  );
}

function HomePage(props:any){
  
  let product_elements:JSX.Element[] = [];
  let category_elements:JSX.Element[] = [];

  for(let product of products){
    product_elements.push(<Product {...product} />);
  }

  for(let category of categories){
    category_elements.push(<Category {...category} />);
  }

  return(
    <content class = "upper-content">
      <Header />
      <center-wrapper>
        <summer-collection>
          <section-title>Summer Collection</section-title>
          <product-row>
            {product_elements}
          </product-row>
        </summer-collection>
        <shop-by-style>
          <section-title>Shop by Style</section-title>
            <product-row>
              {category_elements}
            </product-row>
        </shop-by-style>
      </center-wrapper>
    </content>
  );

}
interface CategoryPageProps{
  category: Category
}

function CategoryPage(props:CategoryPageProps){
  let category = props.category;

  return(
    <div>
      Hello World!
    </div>
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

  categories.push(category);
  return category;
}

(function() {
  //products
  let neon_pink = make_product("Neon Pink", 15.00, "http://placekitten.com/900/900");
  let leaf_scarf_tie = make_product("Leaf Scarf Tie", 15.00, "http://placekitten.com/901/901");
  let fuschia_scarf_tie = make_product("Fuschia Scarf Tie", 15.00, "http://placekitten.com/902/902");
  let turquoise_scarf_tie = make_product("Turquoise Scarf Tie", 15.00, "http://placekitten.com/903/903");
  let retro_dot_scarf_tie = make_product("Retro Dot Scarf Tie", 15.00, "http://placekitten.com/904/904");
  let ikat_scarf_tie = make_product("Ikat Scarf Tie", 15.00, "http://placekitten.com/905/905");
  let kelly_green = make_product("Kelly Green", 15.00, "http://placekitten.com/906/906");
  let peach = make_product("Peach", 15.00, "http://placekitten.com/907/907");
  let red = make_product("Red", 15.00, "http://dummyimage.com/300/ff0000/fff&text=red");

  let scarf_tie_products = [leaf_scarf_tie, fuschia_scarf_tie, turquoise_scarf_tie, retro_dot_scarf_tie, ikat_scarf_tie];

  //categories
  let twist_headbands = make_category("Style", "Twist Headbands", "http://placekitten.com/800/800");
  let tie_headbands = make_category("Style", "Tie Headbands", "http://placekitten.com/801/801");
  let wide_tie_headbands = make_category("Style", "Wide Tie Headbands", "http://placekitten.com/802/802");
  let wrap_headbands = make_category("Style", "Wrap Headbands", "http://placekitten.com/803/803");
  let wide_wrap_headbands = make_category("Style", "Wide Wrap Headbands", "http://placekitten.com/804/804");
  let scarf_ties = make_category("Style", "Scarf Ties", "http://placekitten.com/805/805", scarf_tie_products);
  let shape_of_water = make_category("Movie", "Shape of Water", "http://dummyimage.com/300/000000/fff/&text=\xa0");

  //open_category = scarf_ties;
})()


export default App;
