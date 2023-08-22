const User = require('../models/userModel');
const Trade = require('../models/tradeModel');

exports.dashboard = async (req, res) => {
  const userId = req.user.id;
  //   if (!userId) {
  //     res.status(400);
  //     throw new Error('You need to login');
  //   }
  try {
    const userData = await User.findById(userId);
    const tradeData = await Trade.find({ userId });

    res.status(200).json({
      status: 'Success',
      userData,
      tradeData,
    });
  } catch (err) {
    res.status(400).json({
      status: 'Fail',
      message: err.message,
    });
  }
};
