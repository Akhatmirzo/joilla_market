const Statistics = require("../models/Statistic");

exports.getStatistics = async (req, res) => {
  try {
    const { year, month } = req.params;
    const statistics = await Statistics.findOne({
      year,
      month,
      employerId: req.employerId,
    });

    if (!statistics) {
      res.status(404).send({ error: "Statistics not found" });
      return;
    }

    res.send(statistics);
  } catch (error) {
    res.status(500).send({ error: "Error retrieving statistics" });
  }
};
