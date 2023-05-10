const { BadRequestError } = require("../../core/error.response");
const productClassConfigs = require("./product.config");
class ProductFactory {
  static productRegistry = new Map();
  static registerProductType(type, classRef) {
    ProductFactory.productRegistry.set(type, classRef);
  }
  static async createProduct(type, payload) {
    const productClass = ProductFactory.productRegistry.get(type);
    if (!productClass) {
      throw new BadRequestError(`Invalid Product Type ${type}`);
    }
    return new productClass(payload).createProduct();
  }
}
for (const type in productClassConfigs) {
  ProductFactory.registerProductType(type, productClassConfigs[type]);
}
module.exports = ProductFactory;
