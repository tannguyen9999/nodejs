const { Schema, model } = require("mongoose");

const DOCUMENT_NAME = "furniture";
const COLLECTION_NAME = "furnitures";

const clothingSchema = new Schema(
  {
    brand: {
      type: String,
      required: true,
    },
    size: String,
    material: String,
    product_shop: {
      type: Schema.Types.ObjectId,
      ref: "Shops",
      required: true,
    },
  },
  {
    collection: DOCUMENT_NAME,
    timestamps: true,
  }
);
module.exports = model(COLLECTION_NAME, clothingSchema);
