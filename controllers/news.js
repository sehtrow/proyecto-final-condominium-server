const New = require("../models/news");
const slugify = require("slugify");


exports.createNew = async (req, res) => {
  try {
    req.body.slug = slugify(req.body.title);
    req.body.postedBy = req.params.user_id;
    const newNew = await new New(req.body).save();
    res.json(newNew);
  } catch (err) {
    console.log(err);
    res.status(400).json({
      err: err.message,
    });
  }
};

exports.newsCount = async (req, res) => {
  let total = await New.find({}).estimatedDocumentCount().exec();
  res.json(total);
};

exports.list = async (req, res) => {
  try {
    const { sort, order, page } = req.body;
    const currentPage = page || 1;
    const perPage = 3; 

    const news = await New.find({})
      .skip((currentPage - 1) * perPage)
      .populate("postedBy")
      .sort([[sort, order]])
      .limit(perPage)
      .exec();

    res.json(news);
  } catch (err) {
    console.log(err);
  }
};

exports.getNew = async (req, res) => {
  const neW = await New.findOne({ slug: req.params.slug })
    .populate("User")
    .exec();
  res.json(neW);
};

exports.listNews = async (req, res) => {
  let news = await New.find({})
    .limit(parseInt(req.params.count))
    .populate("User")
    .sort([["createdAt", "desc"]])
    .exec();
  res.json(news);
};

exports.update = async (req, res) => {
  try {
    if (req.body.tower && req.body.number) {
      req.body.slug = slugify(req.body.tower + req.body.number);
    }
    const updated = await New.findOneAndUpdate(
      { slug: req.params.slug },
      req.body,
      { new: true }
    ).exec();
    res.json(updated);
  } catch (err) {
    console.log("New failed to update.", err);
    res.status(400).json({
      err: err.message,
    });
  }
};

exports.deletedNew = async (req, res) => {
  try {
    const deleted = await New.findOneAndRemove({
      slug: req.params.slug,
    }).exec();
    res.json(deleted);
  } catch (err) {
    console.log(err);
    return res.status(400).send("New delete failed, try again.");
  }
};

exports.listAll = async (req, res) =>
  res.json(await New.find({}).sort({ createdAt: -1 }).exec());
