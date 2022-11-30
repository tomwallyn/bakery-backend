import { HttpException } from '@exceptions/HttpException';
import { Product } from '@interfaces/product.interface';
import firebase from 'firebase-admin';
import { isEmpty } from '@utils/util';
import {CreateProductDto} from "@dtos/product.dto";

class ProductService {
  public async findAllProduct(): Promise<Product[]> {
    const products: Product[] = [];
    await firebase.firestore().collection('products').get().then((snapshot) => {
      snapshot.forEach(doc => {
        products.push({id: doc.id, description: doc.data().description, name: doc.data().name, price: doc.data().price, quantity: doc.data().quantity, categories: doc.data().categories})
      });
    })
    return products;
  }

  public async findProductById(productId: string): Promise<Product> {
    let findProduct: Product
    await firebase.firestore().collection('products').doc(productId).get().then((doc) => {
      if (!doc.exists) {
        throw new HttpException(409, "Product doesn't exist");
      } else {
        findProduct = {id: doc.id, description: doc.data().description, name: doc.data().name, price: doc.data().price, quantity: doc.data().quantity, categories: doc.data().categories}
      }
    })
    return findProduct;
  }

  public async createProduct(productData: CreateProductDto): Promise<Product> {
    let createUserData: Product
    if (isEmpty(productData)) throw new HttpException(400, "productData is empty");

    await firebase.firestore().collection('products').where('name', '==', productData.name).get().then(async (snapshot) => {
      if (snapshot.size > 0) {
        throw new HttpException(409, `This email ${productData.name} already exists`);
      } else {
        const res = await firebase.firestore().collection('products').add({description: productData.description, name: productData.name, price: productData.price, quantity: productData.quantity, categories: productData.categories});
        createUserData = {id: res.id, description: productData.description, name: productData.name, price: productData.price, quantity: productData.quantity, categories: productData.categories}
      }
    })
    return createUserData;
  }
}

export default ProductService;
