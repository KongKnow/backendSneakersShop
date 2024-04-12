const mongoose = require("mongoose")

const Schema = mongoose.Schema

const productSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  imageURL: {
    type: String,
    required: true,
  },
  user: {
    _id: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "APIUser",
    },
  },
})

module.exports = mongoose.model("APIProduct", productSchema)
