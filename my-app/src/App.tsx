import React, { Children } from 'react';
import './bizzyclone.css';
import { ReactComponent } from '*.svg';

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
        <ProductPage />
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
    <product-title class = "product-sort-title">{props.product.title || "Neon Pink"} | {props.category.title}</product-title>
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

/*interface DropdownProps{
  children: JSX.Element|JSX.Element[]
}*/

/*function Dropdown(props:DropdownProps){
  return(
    <select name = "sort_by" id = "sort_by" className = "dropdown-select">
      {props.children}
    </select>
  );
}*/

interface DropdownProps{
  children: {value: string, text: string, selected: boolean}[]
}

interface DropdownState{
  selected: string,
  open: boolean
}

class Dropdown extends React.Component<DropdownProps>{
  state:DropdownState = {
    selected: "Current Value",
    open: false
  };

  constructor(props:DropdownProps){
    super(props);
  }

  toggle_options = () => {
    console.trace();

    this.setState({
      selected: this.state.selected,
      open: !this.state.open
    });
  }

  select_option = (event:React.MouseEvent<HTMLOptionElement>) => {
    console.trace();

    this.setState({
      selected: (event.target as any as {value: string})?.value,
      open: false
    });

    console.log((event.target as any as {value: string})?.value, this.state.selected);

    event.stopPropagation();
  }

  render(){
    console.log(this.state.selected);
    let options = [];
    let text = this.props.children[0].text;

    for(let option of this.props.children){
      
      if(option.value === this.state.selected){
        text = option.text;
      }

      options.push(<option value={option.value} onClick={this.select_option}>{option.text}</option>);
    }

    return(
      <dropdown onClick={this.toggle_options}>
        <dropdown-nav>
          <current-value>{text}</current-value>
          <ion-icon name = "chevron-down" />
        </dropdown-nav>
        <option-list class={this.state.open}>
          {options}
        </option-list>
      </dropdown>
    );
  }
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

  return(
      <subheader className = "subheader-category">
        <subheader-title className = "category-page-title">{props.title}</subheader-title>
        <sort>
          <size-wrapper className = "category-position">
            <filter-select>
              <filter-title>Sort By</filter-title>
              <Dropdown>{category_sort}</Dropdown>
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

function Container(props:any){
  console.log(props.children);
  let children = [];

  for(let child of props.children){
    children.push(<item value={typeof child === "string" ? child : child.props.value}>{child}</item>);
  }

  return(
    <container>{children}</container>
  ); 
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

interface ProductPageProps{

}

function ProductPage(props:ProductPageProps){
  let style_sort:OptionProps[] = [
    {value: "twist", text: "Twist", selected: false},
    {value: "tie", text: "Tie", selected: true},
    {value: "wide-tie", text: "Wide Tie", selected: false},
    {value: "wrap", text: "Wrap", selected: false},
    {value: "wide-wrap", text: "Wide Wrap", selected: false},
  ];

  return(
    <div>
      <HeaderMain />
      <content class = "upper-content">
        <center-wrapper>
          <product-page>
            <vertical-half>
              <focus-image />
              <image-select>
                <image-option />
                <image-option />
                <image-option />
                <image-option />
                <image-option />
                <image-option />
                <image-option />
                <image-option />
                <image-option />
              </image-select>
            </vertical-half>
            <vertical-half>
              <product-header>White</product-header>
              <review-info>
                <review-stars>
                  <ion-icon name="star" />
                  <ion-icon name="star" />
                  <ion-icon name="star" />
                  <ion-icon name="star" />
                  <ion-icon name="star" />
                </review-stars>
                <review-count>32 reviews</review-count>
              </review-info>
              <product-type>
                <type-title>Style</type-title>
                <Dropdown>{style_sort}</Dropdown>
              </product-type>
              <add-to-cart>Add to Cart</add-to-cart>
              <google-pay>Buy with G Pay</google-pay>
              <pay-options>More payment options</pay-options>
              <add-to-wishlist>Add to Wishlist</add-to-wishlist>
              <product-blurb>
                This headband is part of the BizzyBasics collection. This collection is made of solid neutral fabrics that will match with a variety of outfits and become a staple in your wardrobe. It is made out of a very soft and stretchy brushed poly fabric. 
              </product-blurb>
              <product-details>
                <details-title>Details</details-title>
                <details-subtitle>Wraps</details-subtitle>
                <ul>
                  <li>Measures 19 inches unstretched</li>
                  <li>Elastic at the back is covered in fabric to help it stretch to your size</li>
                  <li>Wide wrap is 6.5 inches wide vs. wrap is 3.5 inches wide</li>
                </ul>
                <details-subtitle>Tie / Wide Tie</details-subtitle>
                <ul>
                  <li>Measures 27 inches unstretched</li>
                  <li>Can be untied and loosened to fit your specific head size</li>
                  <li>Can be worn with the tie in the front or the back</li>
                  <li>Wide tie is 4 inches wide vs. tie is 2 inches wide</li>
                </ul>
                <details-subtitle>Twist</details-subtitle>
                <ul>
                  <li>Measures 19 inches unstretched</li>
                  <li>Can be worn twisted or untwisted</li>
                  <li>2.5 inches wide</li>
                </ul>
              </product-details>
            </vertical-half>
          </product-page>
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
