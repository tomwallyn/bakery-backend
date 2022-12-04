import { NextFunction, Request, Response } from 'express';
import { Product } from '@interfaces/product.interface';
import productService from '@services/products.service';
import {CreateProductDto} from "@dtos/product.dto";
import { stringSimilarity } from "string-similarity-js";

class ProductsController {
  public productService = new productService();

  public getProducts = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      let findAllUsersData: Product[] = await this.productService.findAllProduct();

      if (req.query.category) findAllUsersData = findAllUsersData.filter(produit => produit.categories == req.query.category);
      if (req.query.name) findAllUsersData =  findAllUsersData.filter(produit => stringSimilarity(produit.name, <string>req.query.name) >= 0.5);

      res.status(200).json({ data: findAllUsersData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getProductById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = String(req.params.id);
      const findOneUserData: Product = await this.productService.findProductById(userId);

      res.status(200).json({ data: findOneUserData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const productData: CreateProductDto = req.body;
      const createProductData: Product = await this.productService.createProduct(productData);

      res.status(201).json({ data: createProductData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };
}

export default ProductsController;
