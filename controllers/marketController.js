const Market = require("../models/Market");

//* POST => Add Market
exports.addMarket = async (req, res) => {
  const { market_name, phone_number, location } = req.body;

  try {
    //* creating a Market
    const market = new Market({
      market_name,
      phone_number,
      location,
      employerId: req.employerId,
    });

    await market.save();

    return res.status(201).send({
      message: "Market successfully created",
      market,
    });
  } catch (error) {
    return res.status(400).send({
      error,
    });
  }
};

//* GET => Markets and search
exports.getMarkets = async (req, res) => {
  try {
    const { search } = req.query;
    let query = {};

    if (search) {
      query = {
        $or: [
          { market_name: { $regex: search, $options: "i" } },
          { location: { $regex: search, $options: "i" } },
        ],
      };
    }

    const markets = await Market.find(query);

    return res.send({
      message: "Markets successfully found",
      data: markets,
    });
  } catch (error) {
    res.status(500).send({ error });
  }
};

//* GET => Market pagination
exports.marketPagination = async (req, res) => {
  try {
    const { page = 1, pageSize = 10 } = req.query;
    const skip = (page - 1) * pageSize;

    const totalMarkets = await Market.countDocuments();
    const markets = await Market.find({ employerId: req.employerId })
      .skip(skip)
      .limit(pageSize);

    const response = {
      all: totalMarkets,
      page,
      count: markets.length,
      page_size: pageSize,
      data: markets,
    };

    res.status(200).send(response);
  } catch (error) {
    res.status(500).send({ error });
  }
};

//* GET => Get one market
exports.getMarket = async (req, res) => {
  const id = req.params.id;

  try {
    const market = await Market.findOne({ _id: id }).exec();

    if (!market) {
      return res.status(400).send({
        message: "Market was not found",
      });
    } else {
      return res.status(200).send({
        message: "Market was found",
        data: market,
      });
    }
  } catch (error) {
    return res.status(500).send({
      error,
    });
  }
};

//* PUT => Update market
exports.editMarket = async (req, res) => {
  const prodId = req.params.id;
  const { market_name, phone_number, location } = req.body;

  try {
    const market = await Market.findOneAndUpdate(
      { _id: prodId },
      {
        $set: {
          market_name,
          phone_number,
          location,
        },
      }
    );

    if (!market) {
      return res.status(400).send({
        message: "Market was not found",
      });
    } else {
      return res.status(200).send({
        message: "Market successfully updated",
        market,
      });
    }
  } catch (error) {
    return res.status(400).send({
      error,
    });
  }
};

//* DELETE => Delete Market
exports.deleteMarket = async (req, res) => {
  const id = req.params.id;

  try {
    const market = await Market.findOneAndDelete({ _id: id });

    if (!market) {
      return res.status(400).send({
        message: "Market was not found",
      });
    } else {
      return res.status(200).send({
        message: "Market successfully deleted",
        market,
      });
    }
  } catch (error) {
    return res.status(400).send({
      error,
    });
  }
};
