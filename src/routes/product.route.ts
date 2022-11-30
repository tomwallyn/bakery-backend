import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import ProductsController from "@controllers/product.controller";
import {CreateProductDto} from "@dtos/product.dto";
import FirebaseAuthMiddleware from "@middlewares/firebase.auth.middleware";

class ProductsRoute implements Routes {
  public path = '/products';
  public router = Router();
  public productsController = new ProductsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.productsController.getProducts);
    this.router.get(`${this.path}/:id`, this.productsController.getProductById);
    this.router.post(`${this.path}`, FirebaseAuthMiddleware, validationMiddleware(CreateProductDto, 'body'), this.productsController.createProduct);
  }
}

export default ProductsRoute;
