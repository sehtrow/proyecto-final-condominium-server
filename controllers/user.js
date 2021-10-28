const User = require("../models/user");

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().populate('property').exec();
    res.json(users);
  } catch (err) {
    console.log(err);
  }
};

exports.getUser = async (req, res) => {
  const user = await User.findOne({ _id: req.params.user_id })
    .populate('property')
    .exec();
  res.json(user);
};


exports.updateProperty = async (req, res) => {
  try {
    const updated = await User.findOneAndUpdate(
      { _id: req.params._id },
      req.body,
      { new: true }
    ).exec();
    res.json(updated);
  } catch (err) {
    console.log("User failed to update.", err);
    res.status(400).json({
      err: err.message,
    });
  }
}


