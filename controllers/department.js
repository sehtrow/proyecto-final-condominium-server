const Department = require("../models/department");
const slugify = require("slugify");


exports.createDepartment = async (req, res) => {
  try {
    req.body.slug = slugify(req.body.tower + req.body.number);
    const newDepartment = await new Department(req.body).save();
    res.json(newDepartment);
  } catch (err) {
    console.log(err);
    res.status(400).json({
      err: err.message,
    });
  }
};

exports.list = async (req, res) => {
  try {
    const departments = await Department.find({})
      .populate("commonExpenses")
      .exec();

    res.json(departments);
  } catch (err) {
    console.log(err);
  }
};

exports.getDepartment = async (req, res) => {
  const department = await Department.findOne({ slug: req.params.slug })
    .populate({
      path: 'commonExpenses',
      populate: { 
        path: 'paidBy'
      }
    })
    .exec();
  res.json(department);
};

exports.listDepartments = async (req, res) => {
  console.log(req.params, 'DEPARTMENTS');
  let departments = await Department.find({})
    .limit(parseInt(req.params.count))
    .populate("commonExpenses")    
    .sort([["createdAt", "desc"]])
    .exec();
  res.json(departments);
};

exports.update = async (req, res) => {
  try {
    if (req.body.tower && req.body.number) {
      req.body.slug = slugify(req.body.tower + req.body.number);
    }
    const updated = await Department.findOneAndUpdate(
      { slug: req.params.slug },
      req.body,
      { new: true }
    ).exec();
    res.json(updated);
  } catch (err) {
    console.log("Department failed to update.", err);
    res.status(400).json({
      err: err.message,
    });
  }
};

exports.deletedDepartment = async (req, res) => {
  try {
    const deleted = await Department.findOneAndRemove({
      slug: req.params.slug,
    }).exec();
    res.json(deleted);
  } catch (err) {
    console.log(err);
    return res.status(400).send("Department delete failed, try again.");
  }
};

exports.addExpense = async (req, res) => {
  try {
    const addCExpense = await Department.findOneAndUpdate(
      { _id: req.params.id },
      { $push: { commonExpenses: req.body.commonExpense } },
      { new: true }
    ).exec();
    res.json(addCExpense);
  } catch (err) {
    console.log("Department failed to add Expense.", err);
    res.status(400).json({
      err: err.message,
    });
  }
};

exports.listDepartmentsUser = async (req, res) => {
  const departments = await Department.find({ slug: req.params.slug })
    .populate("commonExpenses")
    .populate("paidBy")
    .exec();
  res.json(departments);
}

