const joi = require('joi');

const productIdSchema = joi.object({
  productId: joi.string(),
});

const productPageSchema = joi.object({
  page: joi.number().integer().positive(),
});

const createProductSchema = joi.object({
  image: joi.string().required(),
  name: joi.string().required(),
  price: joi.number().integer().required(),
  review: joi.number().max(5).required(),
});

const updateProductSchema = joi.object({
  image: joi.string(),
  name: joi.string(),
  price: joi.number().integer(),
  review: joi.number().max(5),
});

module.exports = {
  productIdSchema,
  createProductSchema,
  updateProductSchema,
  productPageSchema,
};
