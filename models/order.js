const mongoose = require("mongoose")

const Schema = mongoose.Schema

const orderSchema = new Schema({
  user: {
    _id: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "APIUser",
    },
  },
  items: [
    {
      productId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "APIProduct",
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
})

module.exports = mongoose.model("APIOrder", orderSchema)
