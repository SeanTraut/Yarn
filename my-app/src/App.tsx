import React from 'react';
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

function ProductHome(props:Product){
  let source = props.source || "http://placekitten.com/900/900";

  return(
  <product>
    <product-image source = {source} style = {{backgroundImage: `url(${source})`}} class = "image product-home-image"></product-image>
    <product-title>{props.title || "Neon Pink"}</product-title>
    <product-price>${props.price || "15.00"}</product-price>
    <ion-icon name="heart-half" class = "favorite-heart"></ion-icon>
  </product>
  );
}

interface ProductSortProps{
  category: Category,
  product: Product
}

function ProductSort(props:ProductSortProps){
  let source = props.product.source || "http://placekitten.com/900/900";

  return(
  <product>
    <product-image source = {source} style = {{backgroundImage: `url(${source})`}} class = "image product-sort-image"></product-image>
    <product-title class = "foo">{props.product.title || "Neon Pink"} | {props.category.title}</product-title>
    <review-stars>
      <ion-icon name="star" />
      <ion-icon name="star" />
      <ion-icon name="star" />
      <ion-icon name="star" />
      <ion-icon name="star" />
      <review-count>{props.product.reviewCount || "100"} reviews</review-count>
    </review-stars>
    <product-price>${props.product.price || "Sold Out"}</product-price>
  </product>
  );
}

interface OptionProps{
  value: string,
  text: string,
  selected: boolean
}

interface DropdownProps{
  children: JSX.Element|JSX.Element[]
}

function Dropdown(props:DropdownProps){
  return(
    <select name = "sort_by" id = "sort_by" className = "dropdown-select">
      {props.children}
    </select>
  );
}

function CategoryIcon(props:Category){
  let source = props.source || "http://placekitten.com/890/890";

  return(
  <category>
    <category-image source = {source} style = {{backgroundImage: `url(${source})`}} class = "image"></category-image>
    <category-text>{props.title || "Category Text"}</category-text>
  </category>
  );
}

interface GalleryProps{
  children: JSX.Element|JSX.Element[],
  title?: string
}

function Gallery(props:GalleryProps){
  return(
    <collection>
      <section-title>{props.title}</section-title>
      <product-row>
        {props.children}
      </product-row>
    </collection>
  );
}

function Instagram(){
  return(
    <instagram>
      <insta-image source = "http://placekitten.com/901/901" style = {{backgroundImage: `url('http://placekitten.com/901/901')`}} class = "image"></insta-image>
      <ion-icon name="logo-instagram" class = "insta-logo"></ion-icon>
    </instagram>
  );
}

function HeaderMain(){
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

function HeaderCategory(props:Category){
  let category_sort:OptionProps[] = [
    {value: "featured", text: "Featured", selected: false},
    {value: "best-selling", text: "Best selling", selected: true},
    {value: "title-ascending", text: "Alphabetically, A-Z", selected: false},
    {value: "title-descending", text: "Alphabetically, Z-A", selected: false},
    {value: "price-ascending", text: "Price, low to high", selected: false},
    {value: "price-descending", text: "Price, high to low", selected: false},
    {value: "created-ascending", text: "Date, old to new", selected: false},
    {value: "created-descending", text: "Date, new to old", selected: false}
  ];

  let option_elements:JSX.Element[] = [];

  for(let option of category_sort){
    option_elements.push(<option value = {option.value} selected = {option.selected} className = "dropdown-option">{option.text}</option>);
  }

  return(
      <subheader className = "subheader-category">
        <subheader-title className = "category-page-title">{props.title}</subheader-title>
        <sort>
          <size-wrapper className = "category-position">
            <filter-select>
              <filter-title>Sort By</filter-title>
              <Dropdown>{option_elements}</Dropdown>
            </filter-select>
            <filter-count>{props.product.length} products</filter-count>
          </size-wrapper>
        </sort>
      </subheader>
  );
}

function FooterMain(){
  return(
    <content className = "lower-content">
      <footer>
          <footer-column class = "quick-links">
              <column-header>Quick Links</column-header>
              <column-text>Shop All Products</column-text>
              <column-text>About</column-text>
              <column-text>Search</column-text>
              <column-text>Contact</column-text>
              <column-text>FAQs</column-text>
          </footer-column>
          <footer-column class = "blurb">
              <column-header>BizzyB's in the Wild</column-header>
              <wild-blurb>Share your own pics and see how other customers are wearing their BizzyB products on Instagram using <br /> #BizzyBCustomerPhotos.</wild-blurb>
          </footer-column>
          <footer-column class = "newsletter">
              <column-header>Newsletter</column-header>
              <input className = "first-name-input" placeholder = "First Name"></input>
              <input className = "last-name-input" placeholder = "Last Name"></input>
              <input className = "email-address-input" placeholder = "Email Address"></input>
              <button className = "subscribe">Subscribe</button>
          </footer-column>
      </footer>
    </content>
  );
}

function HomePage(props:any){

  return(
    <div className = "Home">
      <HeaderMain />
      <hero class = "hero">
        <h1 className = "page-title">Welcome to Bizzybcrafts</h1>
        <h2 className = "page-subtitle">My goal is to make the busy woman feel put together with the addition of just one accessory.</h2>
        <cta>Shop Summer Collection</cta>
      </hero>
      <content class = "upper-content">
        <center-wrapper>
          <Gallery title = "Summer Collection">{product_elements}</Gallery>
          <Gallery title = "Shop by Style">{category_elements}</Gallery>
          <Gallery title = "Insta Feed"><Instagram /><Instagram /><Instagram /><Instagram /></Gallery>
        </center-wrapper>
      </content>
      <FooterMain />
    </div>
  );

}
interface CategoryPageProps{
  category: Category
}

function CategoryPage(props:CategoryPageProps){
  let category = props.category;
  let product_sort_elements:JSX.Element[] = [];

  for(let product of category.product){
    product_sort_elements.push(<ProductSort product = {product} category = {category} />);
  }

  console.log(category.product);

  return(
    <div>
      <HeaderMain />
      <HeaderCategory {...category} />
      <content class = "upper-content">
        <center-wrapper>
          <Gallery>{product_sort_elements}</Gallery>
        </center-wrapper>
      </content>
      <FooterMain />
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
  let red = make_product("Red", 15.00, "https://dummyimage.com/900/FF0000/fff.jpg&text=Red");

  let scarf_tie_products = [leaf_scarf_tie, fuschia_scarf_tie, turquoise_scarf_tie, retro_dot_scarf_tie, ikat_scarf_tie, red, red, red];

  //categories
  let twist_headbands = make_category("Style", "Twist Headbands", "http://placekitten.com/800/800");
  let tie_headbands = make_category("Style", "Tie Headbands", "http://placekitten.com/801/801");
  let wide_tie_headbands = make_category("Style", "Wide Tie Headbands", "http://placekitten.com/802/802");
  let wrap_headbands = make_category("Style", "Wrap Headbands", "http://placekitten.com/803/803");
  let wide_wrap_headbands = make_category("Style", "Wide Wrap Headbands", "http://placekitten.com/804/804");
  let scarf_ties = make_category("Style", "Scarf Ties", "http://placekitten.com/805/805", scarf_tie_products);


  
  open_category = scarf_ties;
})()

  
let product_elements:JSX.Element[] = [];
let category_elements:JSX.Element[] = [];

for(let product of products){
  product_elements.push(<ProductHome {...product} />);
}

for(let category of categories){
  category_elements.push(<CategoryIcon {...category} />);
}

export default App;
