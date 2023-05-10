const { BadRequestError } = require("../../core/error.response");
const { elictronic } = require("../../models/products/index.model");
const Product = require("./product.service");

class Electronic extends Product {
  async createProduct() {
    const newElectronic = await elictronic.create({
      ...this.product_attributes,
      product_shop: this.product_shop,
    });
    if (!newElectronic) throw new BadRequestError("create new elictronic err");
    const newProduct = await super.createProduct(newElectronic._id);
    if (!newProduct) throw new BadRequestError("create new Product err");
  }
}

module.exports = Electronic;
