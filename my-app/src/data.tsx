
/* === Data Model === */

export interface CartItem{
  product: Product;
  style: string
  quantity: number;
}
export interface Cart {
  cartitems: CartItem[];
  note?: String;
}
interface User {
  name: string,
  email: string;
  password: string;
  wishlist?: Product[] | undefined;
  review?: Review[] | undefined;
}
export interface Product {
  title: string;
  price: string;
  pictures: string[];
  category: Category[];
  description?: string;
  featured?: boolean;
  instock?: boolean;
  reviewCount?: number;
  reviewAverage?: number;
  review?: Review[];
}
interface Review {
  rating: number;
  date: Date;
  title: string;
  body: string;
  user: User;
}
export interface Category {
  type: string;
  title: string;
  source: string;
  product: Product[];
}

class Database{
  products: Product[] = [];
  products_by_name:{[name:string]: Product} = {};
  categories: Category[] = [];
  categories_by_name:{[name:string]: Category} = {};
  all_users: User[] = [];
  user: User | undefined;
  cart: Cart = {cartitems: []};
  rerender?: Function;

  make_product(title:string, price:string, categories:Category[] = [], description?:string, instock?:boolean, featured?:boolean):Product{
    let sources:string[] = [];
    
    for(let i = 0; i < 10; i++){
      sources.push(`https://picsum.photos/seed/${encodeURI(title) + i}/800/800`);
    }
  
    let product:Product = {title, price, pictures: sources, category: categories, description, instock, featured};
    
    for(let category of categories){
      category.product.push(product);
    }
  
    this.products.push(product);
    this.products_by_name[title] = product;

    if(this.rerender){this.rerender();}
    
    return product;
  }

  list_product(names:string[]){
    let products:Product[] = [];

    for(let item of names){
      products.push(this.products_by_name[item]);
    }
    return products;
  }

  make_category(type:string, title:string, source:string, products:Product[] = []){
    let category:Category = {type, title, source, product: products};
  
    for(let product of products){
      product.category.push(category);
    }
  
    this.categories.push(category);
    this.categories_by_name[title] = category;

    if(this.rerender){this.rerender();}
    return category;
  }

  make_user(name:string, email:string, password:string):User{
    let user:User = {name:name, email:email, password:password};
    this.all_users.push(user);

    if(this.rerender){this.rerender();}
    return user;
  }

  set_active_user(user:User){
    this.user = user;

    if(this.rerender){this.rerender();}
  }

  add_to_cart(product:Product, style:string){
    let cartitem:CartItem = {product: product, style:style, quantity: 1};
    
    for(let item of this.cart.cartitems){
      if(cartitem.product === item.product && cartitem.style === item.style){
        ++item.quantity;

        if(this.rerender){
          this.rerender();
        }
        return;
      }
    }
    
    this.cart.cartitems.push(cartitem);

    if(this.rerender){
      this.rerender();
    }
    return;
  }

  remove_from_cart(cartitem:CartItem){
    console.log("Clicked");
    let cartitems = this.cart.cartitems;
    let index;
    while((index = cartitems.indexOf(cartitem)) > -1){
      cartitems.splice(index, 1);
    }

    if(this.rerender){
      this.rerender();
    }
  }

  get_cart_size(){
    let size = 0;
    
    for(let item of this.cart.cartitems){
      size += item.quantity;
    }

    return size;
  }
  

  price_to_number(price:string):number{
    return Number(price.slice(1));
  }

  /* Needs improved for non-whole dollar amounts */
  number_to_price(number:number):string{
    return  '$' + number.toString() + '.00';
  }

  calculate_item_total(price:string, quantity:number):string{
    return this.number_to_price(this.price_to_number(price) * quantity);
  }

  calculate_cart_subtotal(cart:Cart):string{
    let subtotal = 0;

    for(let item of cart.cartitems){
      subtotal += (this.price_to_number(item.product.price) * item.quantity);
    }

    return this.number_to_price(subtotal);
  };
};

/* ============================================= Raw Data ======================================================== */
export let db = new Database();

db.make_product("Neon Pink", "$15.00");
db.make_product("Leaf", "$15.00");
db.make_product("Fuschia", "$15.00");
db.make_product("Turquoise", "$15.00");
db.make_product("Retro Dot", "$15.00");
db.make_product("Ikat", "$15.00");
db.make_product("Kelly Green", "$15.00");
db.make_product("Peach", "$15.00");


db.make_category("twist", "Twist", "http://placekitten.com/805/805", db.list_product([
  "Neon Pink", "Leaf", "Fuschia", "Turquoise", "Retro Dot", "Ikat", "Kelly Green", "Peach"
]));

db.make_category("tie", "Tie", "http://placekitten.com/805/805", db.list_product([
  "Neon Pink", "Leaf", "Fuschia", "Turquoise", "Retro Dot", "Ikat", "Kelly Green", "Peach"
]));

db.make_category("wide-tie", "Wide Tie", "http://placekitten.com/805/805", db.list_product([
  "Neon Pink", "Leaf", "Fuschia", "Turquoise", "Retro Dot", "Ikat", "Kelly Green", "Peach"
]));

db.make_category("wrap", "Wrap", "http://placekitten.com/805/805", db.list_product([
  "Neon Pink", "Leaf", "Fuschia", "Turquoise", "Retro Dot", "Ikat", "Kelly Green", "Peach"
]));

db.make_category("wide-wrap", "Wide Wrap", "http://placekitten.com/805/805", db.list_product([
  "Neon Pink", "Leaf", "Fuschia", "Turquoise", "Retro Dot", "Ikat", "Kelly Green", "Peach"
]));

db.make_category("scarf", "Scarf Ties", "http://placekitten.com/805/805", db.list_product([
  "Neon Pink", "Leaf", "Fuschia", "Turquoise", "Retro Dot", "Ikat", "Kelly Green", "Peach"
]));

db.add_to_cart(db.products[0], "Nice!");
db.add_to_cart(db.products[0], "Nice!");
db.add_to_cart(db.products[1], "Nice!");