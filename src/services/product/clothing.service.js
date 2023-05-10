const { BadRequestError } = require("../../core/error.response");
const { clothing } = require("../../models/products/index.model");
const Product = require("./product.service");

class Clothing extends Product {
  async createProduct() {
    const newClothing = await clothing.create({
      ...this.product_attributes,
      product_shop: this.product_shop,
    });
    if (!newClothing) throw new BadRequestError("create new Clothing err");
    const newProduct = await super.createProduct(newClothing._id);
    if (!newProduct) throw new BadRequestError("create new Product err");
    return newProduct;
  }
}

module.exports = Clothing;
