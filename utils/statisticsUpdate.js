const Product = require("../models/Product");
const Statistic = require("../models/Statistic");
const { months } = require("./date");

exports.updateStatistics = async function (order, employerId) {
  const { products } = order;
  const date = new Date();
  const statistics = await Statistic.findOne({
    employerId: employerId,
    month: months[date.getMonth()],
    year: date.getFullYear(),
  });

  if (!statistics) {
    return;
  }

  //? Update the statistics with the new order data
  for (const product of products) {
    const existingProduct = statistics.products.find(
      (p) => p.productId == product.productId
    );
    if (existingProduct) {
      existingProduct.soldQty += product.qty;
      existingProduct.inStoreQty -= product.qty;
    } else {
      //? Add the product to the statistics if it doesn't exist
      const fullProduct = await Product.findById(product.productId);

      statistics.products.push({
        productId: product.productId,
        name: fullProduct.name,
        code: fullProduct.code,
        soldQty: product.qty,
        inStoreQty: fullProduct.qty,
      });
    }
  }

  //? Sort the products by soldQty in ascending order
  statistics.products.sort((a, b) => a.soldQty - b.soldQty);

  //? Keep only the top 6 products
  if (statistics.products.length > 6) {
    statistics.products = statistics.products.slice(0, 6);
  }

  //? Save the updated statistics
  await statistics.save();
};
