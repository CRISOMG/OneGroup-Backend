const express = require('express');
const passport = require('passport');
const ProductsService = require('../services/products');

const { productIdSchema, createProductSchema, updateProductSchema } = require('../utils/schemas/products');

const validationHandler = require('../utils/middleware/validationHandler');
const scopesValidationHandler = require('../utils/middleware/scopesValidationHandler');


// JWT strategy
require('../utils/auth/strategies/jwt');

function productsApi(app) {
  const router = express.Router();
  app.use('/api/products', router);

  const productsService = new ProductsService();

  router.get('/',
    passport.authenticate('jwt', { session: false }),
    scopesValidationHandler(['read:products']),
    async function (req, res, next) {

      try {
        const products = await productsService.getProducts();

        res.status(200).json({
          data: products,
          message: 'Products listed',
        });
      } catch (err) {
        next(err);
      }
    }
  );

  router.get('/:productId',
    passport.authenticate('jwt', { session: false }),
    scopesValidationHandler(['read:products']),
    validationHandler(productIdSchema, 'params'),
    async function (req, res, next) {
      const { productId } = req.params;

      try {
        const products = await productsService.getProduct({ productId });

        res.status(200).json({
          data: products,
          message: 'Product retrieved',
        });
      } catch (err) {
        next(err);
      }
    }
  );

  router.post('/',
    passport.authenticate('jwt', { session: false }),
    scopesValidationHandler(['create:products']),
    validationHandler(createProductSchema),
    async function (req, res, next) {
      const { body: product } = req;
      try {
        const createdProductId = await productsService.createProduct({ product });

        res.status(201).json({
          data: createdProductId,
          message: 'Product created',
        });
      } catch (err) {
        next(err);
      }
    }
  );

  router.put('/:productId',
    passport.authenticate('jwt', { session: false }),
    scopesValidationHandler(['update:products']),
    validationHandler(updateProductSchema),
    validationHandler(productIdSchema , 'params'),
    async function (req, res, next) {
      const { productId } = req.params;
      const { body: product } = req;

      try {
        const updatedProductId = await productsService.updateProduct({
          productId,
          product,
        });

        res.status(200).json({
          data: updatedProductId,
          message: 'Product updated',
        });
      } catch (err) {
        next(err);
      }
    }
  );

  router.delete('/:productId',
    passport.authenticate('jwt', { session: false }),
    scopesValidationHandler(['delete:products']),
    validationHandler(productIdSchema, 'params'),
    async function (req, res, next) {
      const { productId } = req.params;

      try {
        const deletedProductId = await productsService.deleteProduct({ productId });

        res.status(200).json({
          data: deletedProductId,
          message: 'Product deleted',
        });
      } catch (err) {
        next(err);
      }
    }
  );
}

module.exports = productsApi;
