const MongoLib = require('../lib/mongo');

class ProductsService {
  constructor() {
    this.collection = 'products';
    this.mongoDB = new MongoLib();
  }

  async getProducts({ page }) {
    const Products = await this.mongoDB.getPaginated(this.collection, page);
    return Products || [];
  }

  async getProduct({ productId }) {
    const product = await this.mongoDB.get(this.collection, productId);
    return product || {};
  }

  async createProduct({ product }) {
    const createdProductId = await this.mongoDB.create(this.collection, product);
    return createdProductId;
  }

  async updateProduct({ productId, product } = {}) {
    const updatedProductId = await this.mongoDB.update(this.collection, productId, product);
    return updatedProductId;
  }

  async deleteProduct({ productId }) {
    const deletedProductId = await this.mongoDB.delete(this.collection, productId);
    return deletedProductId;
  }
}

module.exports = ProductsService;
