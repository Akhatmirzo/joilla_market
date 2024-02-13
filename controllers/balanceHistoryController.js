const BalanceHistory = require("../models/BalanceHistory");

exports.getBalanceHistory = async (req, res) => {
  try {
    const { year, month } = req.query;
    let query = { employerId: req.employerId };

    if (year || month) {
      year ? (query.year = year) : null;
      month ? (query.month = month) : null;
    }

    const balanceHistories = await BalanceHistory.find(query).sort({
      createdAt: -1,
    });
    console.log(balanceHistories);
    if (balanceHistories.length <= 0) {
      res.status(404).send({ error: "Balance history not found" });
      return;
    }

    res.send(balanceHistories);
  } catch (error) {
    res.status(500).send({ error: "Error retrieving balance history" });
  }
};
