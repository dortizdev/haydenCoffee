const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  order: {
    type: Array,
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  }
});

const Order = mongoose.model('Orders', OrderSchema, 'orders');

module.exports = Order;
