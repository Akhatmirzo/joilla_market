const BalanceHistory = require("../models/BalanceHistory");
const Employer = require("../models/Employer");
const { months } = require("./date");
const { isLastDayOfMonth } = require("./isLastDayOfMonth");

exports.balanceHistorySaver = async () => {
  const currentDate = new Date();

  //* Check if it's the last day of the month
  if (isLastDayOfMonth(currentDate)) {
    //* Get all employers
    const employers = await Employer.find({});

    //* Create balanceHistory for each employer
    for (const employer of employers) {
      const month = months[currentDate.getMonth()];
      const year = currentDate.getFullYear();

      const balanceHistory = new BalanceHistory({
        month,
        year,
        balance: employer.balance,
        employerId: employer._id,
      });

      await balanceHistory.save();
      employer.balance = 0;
      await employer.save();
    }
  }
};
