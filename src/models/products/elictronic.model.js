const { Schema, model } = require("mongoose");

const DOCUMENT_NAME = "elictronic";
const COLLECTION_NAME = "elictronics";

const elictronicSchema = new Schema(
  {
    manufacturer: {
      type: String,
      required: true,
    },
    model: String,
    color: String,
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
module.exports = model(COLLECTION_NAME, elictronicSchema);
