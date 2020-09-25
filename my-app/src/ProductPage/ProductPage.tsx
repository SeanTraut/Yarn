import { ReactComponent } from '*.svg';
import { render } from '@testing-library/react';
import React from 'react';
import { db, Product} from '../data';
import { OptionProps, HeaderMain, Dropdown, Button, FooterMain, WishlistButton, Reviews, ImageGallery } from "../shared";

interface ProductPageProps {
  product: Product;
}
interface ProductPageState{
  selected: string;
}

export class ProductPage extends React.Component<ProductPageProps>{
  state:ProductPageState = {
    selected: this.props.product.category[0].title
  }

  update_selected = (value:string) => {
    this.setState({selected:value});
  }

  render() {
    let style_sort: OptionProps[] = [];
    let selected:string = this.state.selected;

    for (let cat of this.props.product.category){
      style_sort.push({ value: cat.title, text: cat.title, selected: false });
    }
    
    return (
      <div>
        <HeaderMain />
        <content class="upper-content">
          <center-wrapper>
            <product-page>
              <vertical-half>
                <ImageGallery product = {this.props.product} />
              </vertical-half>
              <vertical-half>
                <product-header>{this.props.product.title}</product-header>
                <Reviews product = {this.props.product} />
                <price>{this.props.product.price}</price>
                <shipping-details><a href="/foo">Shipping</a>&nbsp;calculated at checkout.</shipping-details>
                <product-type>
                  <type-title>Style</type-title>
                  <Dropdown class="style" selected={selected} onChanged={this.update_selected}>{style_sort}</Dropdown>
                </product-type>
                <Button class="add-to-cart"
                  onClick={() => {db.add_to_cart(this.props.product, selected)}}>
                  Add to Cart
                </Button>
                <Button class="g-pay">
                  <text>Buy with&nbsp;</text>
                  <i className="fab fa-google-pay" />
                </Button>
                <Button class="payment-options">More payment options</Button>
                <WishlistButton wishlisted={false} count={48}/>
                <product-blurb>
                  {this.props.product.description}
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
}
