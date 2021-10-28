const CommonExpense = require("../models/commonExpenses");

exports.createCommonExpense = async (req, res) => {
  try {
    const newCommonExpense = await new CommonExpense(req.body).save();
    res.json(newCommonExpense);
  } catch (err) {    
    res.status(400).json({
      err: err.message,
    });
  }
}

exports.list = async (req, res) => {
  let expenses = await CommonExpense.find({})
    .populate("paidBy")
    .sort([["createdAt", "desc"]])
    .exec();  
  res.json(expenses);
};

exports.getCommonExpense = async (req, res) => {
  const commonExpense = await CommonExpense.findOne({ _id: req.params.id })
    .populate("paidBy")
    .exec();
  res.json(commonExpense);
}

exports.listCommonExpenses = async (req, res) => {
  let expenses = await CommonExpense.find({})
    .limit(parseInt(req.params.count))
    .sort([["createdAt", "desc"]])
    .exec();
  res.json(expenses);
}

exports.update = async (req, res) => {
  try {
    const updated = await CommonExpense.findOneAndUpdate(
      { _id: req.params._id },
      req.body,
      { new: true }
    ).exec();
    res.json(updated);
  } catch (err) {
    console.log("Common Expense failed to update.", err);
    res.status(400).json({
      err: err.message,
    });
  }
}

exports.deleteCommonExpense = async (req, res) => {
  console.log('ENTRA ACA')
  try {
    const deleted = await CommonExpense.findOneAndRemove({
      _id: req.params.id,
    }).exec();
    res.json(deleted);
  } catch (err) {
    console.log(err);
    return res.status(400).send("Common Expense delete failed, try again.");
  }
}

exports.paidExpense = async (req, res) => {
  try {
    const updated = await CommonExpense.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    ).exec();
    res.json(updated);
  } catch (err) {
    console.log("Common Expense failed to paid.", err);
    res.status(400).json({
      err: err.message,
    });
  }
}
