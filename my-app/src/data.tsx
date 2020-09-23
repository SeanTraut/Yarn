
/* === Data Model === */
interface Cart {
  itemCount: number;
  products: Product[];
  subtotal: number;
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
  cart: Cart | undefined;
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
  };

  list_product(names:string[]){
    let products:Product[] = [];

    for(let item of names){
      products.push(this.products_by_name[item]);
    };
    return products;
  };

  make_category(type:string, title:string, source:string, products:Product[] = []){
    let category:Category = {type, title, source, product: products};
  
    for(let product of products){
      product.category.push(category);
    }
  
    this.categories.push(category);
    this.categories_by_name[title] = category;

    if(this.rerender){this.rerender();}
    return category;
  };

  make_user(name:string, email:string, password:string):User{
    let user:User = {name:name, email:email, password:password};
    this.all_users.push(user);

    if(this.rerender){this.rerender();}
    return user;
  };

  set_active_user(user:User){
    this.user = user;

if(this.rerender){this.rerender();}
  };

  add_to_cart(product:Product){
    if(this.cart){
      ++this.cart.itemCount;
      this.cart.products.push(product);

    if(this.rerender){this.rerender();}

      return;
    }

    this.cart = {itemCount: 1, products: [product], subtotal: Number(product.price)};

    if(this.rerender){this.rerender();}

    return this.cart;
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

console.log(db);