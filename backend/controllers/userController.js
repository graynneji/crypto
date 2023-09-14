const User = require('../models/userModel');
const Trade = require('../models/tradeModel');

//Get Users
exports.getAllUsers = async (req, res) => {
  const allUsers = await User.find();
  // const { password, ...others } = allUsers._doc;
  res.status(200).json({
    status: 'Success',
    allUsers,
  });
};

//Get user
exports.getAUser = async (req, res) => {

    try {
      const userId = req.params.id;
  
      // Fetch the user by their ID
      const user = await User.findById(userId);
  
      // If no user is found, return an error response
      if (!user) {
        return res.status(400).json({
          status: 'Fail',
          message: 'User not found!',
        });
      }
  
      // Fetch the trade records associated with the user's ID
      const trades = await Trade.find({ userId: userId });
  
      // Create a response object that includes user data and trade data
      const response = {
        status: 'Success',
        user: {
          ...user._doc, // Include user data
        },
        trade: trades, // Include trade data
      };
  
      res.status(200).json(response);
    } catch (error) {
      console.error('Error retrieving user and trade data:', error);
      res.status(500).json({
        status: 'Error',
        message: 'Internal Server Error',
      });
    }
  };
  
//Update user
exports.update = async (req, res) => {
  try {
    const currentUser = await User.findById(req.params.id);
    if (!currentUser) {
      res.status(404);
      throw new Error('User not found');
    }
    //updating the user
    if (currentUser._id.toString() !== req.params.id) {
      res.status(403);
      throw new Error('User dont have permission to update');
    }

    const updateUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: 'Success',
      data: {
        updateUser,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'Fail',
      message: err.message,
    });
  }
};
