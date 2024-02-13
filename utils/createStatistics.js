const Employer = require("../models/Employer");
const Statistic = require("../models/Statistic");
const { months } = require("./date");

exports.createStatistics = async () => {
  const date = new Date();
  

  if (date.getDate() == 1) {
    //* Get all employers
    const employers = await Employer.find({});

    //* Create statistics object for all employers
    for (const employer of employers) {
      const statistic = new Statistic({
        month: months[date.getMonth()],
        year: date.getFullYear(),
        products: [],
        employerId: employer._id,
      });
      await statistic.save();
    }
  }
};
