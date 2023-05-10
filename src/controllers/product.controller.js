const { SuccessResponse, OK } = require("../core/success.response");
const ProductFactory = require("../services/product/index.service");

class ProductController {
  static createProduct = async (req, res, next) => {
    const data = await ProductFactory.createProduct(req.body.product_type, {
      ...req.body,
      product_shop: req.user.userId,
    });

    new OK({
      message: "Create new Product success",
      metadata: data,
    }).send(res);
  };
}
module.exports = ProductController;
