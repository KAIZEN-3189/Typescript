// import _ from "lodash";

// declare var GLOBAL: string;

// console.log(_.shuffle([1, 2, 3]));

// console.log(GLOBAL);

import "reflect-metadata";
import { plainToClass } from 'class-transformer';
import { validate } from "class-validator";

import { Product } from "./product.model";

// const newProduct = new Product('', -5);
const newProduct = new Product('New Product', 5);
validate(newProduct).then(error => {
  if(error.length > 0) {
    console.log(error);
  } else {
    console.log(newProduct);
  }
});


const products = [
  { title: "A Carpet", price: 29.99},
  { title: "A Book", price: 10.99}
];

// const p1 = new Product('A Book', 12.99);

// Manually
// const loadedProducts = products.map(product => {
//   return new Product(product.title, product.price);
// });

// for(const product of loadedProducts) {
//   console.log(product);
// }

const loadedProducts = plainToClass(Product, products);
console.log(loadedProducts);

// console.log(p1.getInformation());