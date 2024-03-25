const internModel = require("../models/intern.model");

async function create(intern) {
  return internModel.create(intern);
}

async function find({searchString = "", page = 1, perPage = Number.MAX_SAFE_INTEGER,}) {
  const filter = {
    lastName: { $regex: `^${searchString}`, $options: "i" },
  };
  return {
    items: await internModel
      .find(filter)
      .skip((page - 1) * perPage)
      .limit(Number(perPage)),
    count: await internModel.countDocuments(filter),
  };
}

async function findById(id) {
  return internModel.findById(id);
}

async function findByIdAndUpdate(id, update) {
  return internModel.findByIdAndUpdate(id, update, {
    upsert: false,
    new: true,
  });
}

async function findByIdAndDelete(id) {
  return internModel.findByIdAndDelete(id);
}

async function findByLastName(lastName) {
  const filter = {
    lastName: { $regex: `^${lastName}`, $options: "i" },
  };
  return internModel.find(filter);
}


module.exports = {
  create,
  find,
  findById,
  findByIdAndUpdate,
  findByIdAndDelete,
  findByLastName,
};
