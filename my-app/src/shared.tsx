import React from 'react';
import { Category } from './data';
/* === Components === */

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

  constructor(props: DropdownProps) {
    super(props);
  }

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
    console.log(this.state.selected);
    let options = [];
    let style = `${this.props.class} ${this.state.open ? "open" : "closed"}`;
    let text = this.props.children[0].text;

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
}

export class Button extends React.Component<ButtonProps> {
  constructor(props: DropdownProps) {
    super(props);
  }

  render() {
    let style = this.props.class;

    return (
      <btn className={style}>
        <btn-content className={style}>{this.props.children}</btn-content>
      </btn>
    );
  }
}

export function CategoryIcon(props: Category) {
  let source = props.source || "http://placekitten.com/890/890";

  return (
    <category>
      <category-image source={source} style={{ backgroundImage: `url(${source})` }} class="image"></category-image>
      <category-text>{props.title || "Category Text"}</category-text>
    </category>
  );
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

export function HeaderMain() {
  return (
    <header>
      <announcement-bar>
        <bar-message>Order processing time is 1 week. Check out the FAQ tab below.</bar-message>
      </announcement-bar>
      <site-header>
        <img src="http://placekitten.com/160/95" className="logo" />
        <spacer></spacer>
        <nav>
          <ul>
            <li className="nav-item"><nav-text>Home</nav-text></li>
            <li className="nav-item">
              <nav-text>Shop</nav-text>
              <dropdown-icon>
                <ion-icon name="chevron-down"></ion-icon>
              </dropdown-icon>
            </li>
            <li className="nav-item">
              <nav-text>About</nav-text>
              <dropdown-icon>
                <ion-icon name="chevron-down"></ion-icon>
              </dropdown-icon>
            </li>
            <li className="nav-item"><nav-text>FAQs</nav-text></li>
            <li className="nav-item"><nav-text>Contact</nav-text></li>
            <li className="nav-item"><nav-text>Launch/Restock Info</nav-text></li>
          </ul>
        </nav>
        <spacer></spacer>
        <controls>
          <ion-icon name="search" class="search"></ion-icon>
          <ion-icon name="person" class="profile"></ion-icon>
          <cart class="bag">
            <ion-icon name="lock-closed" class="bag-icon"></ion-icon>
            <icon-data class="bag-count">0</icon-data>
          </cart>
        </controls>
      </site-header>
    </header>
  );
}

export function HeaderCategory(props: Category) {
  let category_sort: OptionProps[] = [
    { value: "featured", text: "Featured", selected: false },
    { value: "best-selling", text: "Best selling", selected: true },
    { value: "title-ascending", text: "Alphabetically, A-Z", selected: false },
    { value: "title-descending", text: "Alphabetically, Z-A", selected: false },
    { value: "price-ascending", text: "Price, low to high", selected: false },
    { value: "price-descending", text: "Price, high to low", selected: false },
    { value: "created-ascending", text: "Date, old to new", selected: false },
    { value: "created-descending", text: "Date, new to old", selected: false }
  ];

  return (
    <subheader className="subheader-category">
      <subheader-title className="category-page-title">{props.title}</subheader-title>
      <sort>
        <size-wrapper className="category-position">
          <filter-select>
            <filter-title>Sort By</filter-title>
            <Dropdown class="category">{category_sort}</Dropdown>
          </filter-select>
          <filter-count>{props.product.length} products</filter-count>
        </size-wrapper>
      </sort>
    </subheader>
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
