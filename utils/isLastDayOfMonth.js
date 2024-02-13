exports.isLastDayOfMonth = function (date) {
  //* Calculate the next day
  const nextDay = new Date(date);
  nextDay.setDate(date.getDate() + 1);

  //* If the next day is in the next month, it's the last day of the current month
  return date.getMonth() !== nextDay.getMonth();
};
