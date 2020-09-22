import React from 'react';
import { Product, db } from './data';

/* === Components === */
interface ImageGalleryProps{
  product: Product
}

interface ImageOptionElement extends HTMLElement{
  foo: number
}

export class ImageGallery extends React.Component<ImageGalleryProps>{
  state = {
    selected: 0,
  };

  select_focus = (event:React.MouseEvent<ImageOptionElement>) =>{
    this.setState({
      selected: event.currentTarget.getAttribute("foo"),
    });
  }

  render(){
    let index = this.state.selected;
    let pictures = this.props.product.pictures;
    let image_options:JSX.Element[] = [];
    
    for(let picture of pictures){
      image_options.push(<image-option foo = {pictures.indexOf(picture)} style={{ backgroundImage: `url(${picture})`}} onClick={this.select_focus}/>);
    }

    return(
      <image-gallery>
        <image-box>
          <focus-image style={{ backgroundImage: `url(${pictures[index]})` }} />
        </image-box>
        <image-select>
          {image_options}
        </image-select>
      </image-gallery>
    );
  }
}

interface ReviewsProps{
  product: Product
}

export function Reviews(props:ReviewsProps){
  let star_count = props.product.reviewAverage || 0;
  let star_elements:JSX.Element[] = [];
  let review_count = props.product.reviewCount || 0;
  
  for(let i = 0;(i < star_count) && (i < 5); i++){
    star_elements.push(<ion-icon name="star" />);
  };

  while(star_elements.length < 5){
    star_elements.push(<ion-icon name="star-outline" />);
  };
  
  return(
    <review-info>
      <review-stars>
        {star_elements}
      </review-stars>
      <review-count>
        {review_count} reviews
      </review-count>
    </review-info>
  );
};

export interface OptionProps {
  value: string;
  text: string;
  selected: boolean;
}
interface DropdownProps {
  class: string;
  children: { value: string; text: string; selected: boolean; }[];
}
interface DropdownState {
  selected: string;
  open: boolean;
}

export class Dropdown extends React.Component<DropdownProps> {
  state: DropdownState = {
    selected: "Current Value",
    open: false
  };

  toggle_options = () => {
    console.trace();

    this.setState({
      selected: this.state.selected,
      open: !this.state.open
    });
  };

  select_option = (event: React.MouseEvent<HTMLOptionElement>) => {
    console.trace();

    this.setState({
      selected: (event.target as any as { value: string; })?.value,
      open: false
    });

    console.log((event.target as any as { value: string; })?.value, this.state.selected);

    event.stopPropagation();
  };

  render() {
    let options = [];
    let style = `${this.props.class} ${this.state.open ? "open" : "closed"}`;
    let text = this.props.children[0] ? this.props.children[0].text : "EMPTY";

    for (let option of this.props.children) {
      if (option.value === this.state.selected) {
        text = option.text;
      }

      options.push(<option value={option.value} onClick={this.select_option}>{option.text}</option>);
    }

    return (
      <dropdown onClick={this.toggle_options} className={style}>
        <dropdown-nav>
          <current-value>{text}</current-value>
          <ion-icon name="chevron-down" />
        </dropdown-nav>
        <option-list>
          {options}
        </option-list>
      </dropdown>
    );
  }
}

interface ButtonProps {
  class: string;
  children: any;
  onClick?: Function
}

export class Button extends React.Component<ButtonProps> {
  render() {
    let style = this.props.class;
    
    return (
      <btn className={style}>
        <btn-content className={style} onClick={this.props.onClick}>{this.props.children}</btn-content>
      </btn>
    );
  }
}

interface WishlistButtonProps{
  wishlisted: boolean,
  count: number,
  class?: string,
}

export class WishlistButton extends React.Component<WishlistButtonProps>{
  debug_wishlist = this.props.wishlisted;

  toggle = () =>{
    this.debug_wishlist = !this.debug_wishlist;
    this.forceUpdate();
  }

  render(){
    let heart_type = this.debug_wishlist ? "fas" : "far";
    let count_display = this.debug_wishlist ? (this.props.count + 1) : this.props.count;

    return(
      <Button class={`${this.props.class} add-to-wishlist`}>
        <box onClick={this.toggle}>
          <i className={`${heart_type} fa-heart`}/>
          <text>Add to Wishlist</text>
        </box>
        <count>{count_display}</count>
      </Button>
    );
  }
} 

interface GalleryProps {
  children: JSX.Element | JSX.Element[];
  title?: string;
}

export function Gallery(props: GalleryProps) {
  return (
    <collection>
      <section-title>{props.title}</section-title>
      <product-row>
        {props.children}
      </product-row>
    </collection>
  );
}

interface HeaderMainProps{
  
}

export function HeaderMain(props:HeaderMainProps) {
  return (
    <header>
      <announcement-bar>
        <bar-message>Order processing time is 1 week. Check out the FAQ tab below.</bar-message>
      </announcement-bar>
      <site-header>
        <img src="http://placekitten.com/160/95" className="logo" alt="logo" />
        <spacer></spacer>
        <nav>
          <ul>
            <li className="nav-item"><a className = "nav-text" href="#home">Home</a></li>
            <li className="nav-item">
              <a className = "nav-text">Shop</a>
              <dropdown-icon>
                <ion-icon name="chevron-down"></ion-icon>
              </dropdown-icon>
            </li>
            <li className="nav-item">
              <a className = "nav-text">About</a>
              <dropdown-icon>
                <ion-icon name="chevron-down"></ion-icon>
              </dropdown-icon>
            </li>
            <li className="nav-item"><a className = "nav-text">FAQs</a></li>
            <li className="nav-item"><a className = "nav-text">Contact</a></li>
            <li className="nav-item"><a className = "nav-text">Launch/Restock Info</a></li>
          </ul>
        </nav>
        <spacer></spacer>
        <controls>
          <ion-icon name="search" class="search"></ion-icon>
          <ion-icon name="person" class="profile"></ion-icon>
          <cart class="bag">
            <ion-icon name="lock-closed" class="bag-icon" />
              <icon-data class="bag-count">{db.cart?.itemCount || 0}</icon-data>
          </cart>
        </controls>
      </site-header>
    </header>
  );
}

export function FooterMain() {
  return (
    <content className="lower-content">
      <footer>
        <footer-column class="quick-links">
          <column-header>Quick Links</column-header>
          <column-text>Shop All Products</column-text>
          <column-text>About</column-text>
          <column-text>Search</column-text>
          <column-text>Contact</column-text>
          <column-text>FAQs</column-text>
        </footer-column>
        <footer-column class="blurb">
          <column-header>BizzyB's in the Wild</column-header>
          <wild-blurb>Share your own pics and see how other customers are wearing their BizzyB products on Instagram using <br /> #BizzyBCustomerPhotos.</wild-blurb>
        </footer-column>
        <footer-column class="newsletter">
          <column-header>Newsletter</column-header>
          <input className="first-name-input" placeholder="First Name"></input>
          <input className="last-name-input" placeholder="Last Name"></input>
          <input className="email-address-input" placeholder="Email Address"></input>
          <button className="subscribe">Subscribe</button>
        </footer-column>
      </footer>
    </content>
  );
}
