const { BadRequestError } = require("../../core/error.response");
const { furniture } = require("../../models/products/index.model");
const Product = require("./product.service");

class Furniture extends Product {
  async createProduct() {
    const newFurniture = await furniture.create({
      ...this.product_attributes,
      product_shop: this.product_shop,
    });
    if (!newFurniture) throw new BadRequestError("create new elictronic err");
    const newProduct = await super.createProduct(newFurniture._id);
    if (!newProduct) throw new BadRequestError("create new Product err");
  }
}

module.exports = Furniture;
