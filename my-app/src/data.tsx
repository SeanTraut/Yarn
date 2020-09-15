/* === Data Model === */
interface Cart {
  itemCount: number;
  total: number;
  products: Product[];
}
interface User {
  email: string;
  password: string; /* lol */
  wishlist: Product[];
  review: Review[];
}
export interface Product {
  title: string;
  price: string;
  source: string;
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


/* ========================================= Maker Functions =================================================== */
export function make_product(title:string, price:string, source:string,
  categories:Category[] = [], description?:string, instock?:boolean, featured?:boolean):Product{
  let product:Product = {title, price, source, category: categories, description, instock, featured};
  
  for(let category of categories){
    category.product.push(product);
  }

  products.push(product);
  return product;
}

export function make_category(type:string, title:string, source:string, products:Product[] = []){
  let category:Category = {type, title, source, product: products};

  for(let product of products){
    product.category.push(category);
  }

  categories.push(category);
  return category;
}


/* ============================================= Raw Data ======================================================== */
export let products:Product[] = [];
export let categories:Category[] = [];

export let testProduct = make_product("Black", "$15.00", "https://dummyimage.com/900/000000/fff.jpg&text=Black");
export let testProductCategories:Category[] = [];
testProductCategories.push(make_category("twist", "Twist", "http://placekitten.com/805/805", [testProduct]));
testProductCategories.push(make_category("tie", "Tie", "http://placekitten.com/805/805", [testProduct]));
testProductCategories.push(make_category("wide-tie", "Wide Tie", "http://placekitten.com/805/805", [testProduct]));
testProductCategories.push(make_category("wrap", "Wrap", "http://placekitten.com/805/805", [testProduct]));
testProductCategories.push(make_category("wide-wrap", "Wide Wrap", "http://placekitten.com/805/805", [testProduct]));

let neon_pink = make_product("Neon Pink", "$15.00", "http://placekitten.com/900/900");
let leaf_scarf_tie = make_product("Leaf Scarf Tie", "$15.00", "http://placekitten.com/901/901");
let fuschia_scarf_tie = make_product("Fuschia Scarf Tie", "$15.00", "http://placekitten.com/902/902");
let turquoise_scarf_tie = make_product("Turquoise Scarf Tie", "$15.00", "http://placekitten.com/903/903");
let retro_dot_scarf_tie = make_product("Retro Dot Scarf Tie", "$15.00", "http://placekitten.com/904/904");
let ikat_scarf_tie = make_product("Ikat Scarf Tie", "$15.00", "http://placekitten.com/905/905");
let kelly_green = make_product("Kelly Green", "$15.00", "http://placekitten.com/906/906");
let peach = make_product("Peach", "$15.00", "http://placekitten.com/907/907");
let red = make_product("Red", "$15.00", "https://dummyimage.com/900/FF0000/fff.jpg&text=Red");


let scarf_tie_products = [leaf_scarf_tie, fuschia_scarf_tie, turquoise_scarf_tie, retro_dot_scarf_tie, ikat_scarf_tie, red, red, red];

export let scarf_ties = make_category("Style", "Scarf Ties", "http://placekitten.com/805/805", scarf_tie_products);
