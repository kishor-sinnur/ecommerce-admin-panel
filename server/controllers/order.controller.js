const Order = require('../models/order.model');

exports.getAllOrders = async (req, res) => {
  const orders = await Order.find();
  res.json(orders);
};
