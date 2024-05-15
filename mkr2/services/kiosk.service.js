const kioskModel = require('../models/kiosk.model');

async function create(kiosk) {
  return kioskModel.create(kiosk);
}

async function find({ searchString = "", page = 1, perPage = Number.MAX_SAFE_INTEGER }) {
  const filter = {
    name: { $regex: `^${searchString}`, $options: "i" },
  };
  return {
    items: await kioskModel
      .find(filter)
      .skip((page - 1) * perPage)
      .limit(Number(perPage)),
    count: await kioskModel.countDocuments(filter),
  };
}

async function findById(id) {
  return kioskModel.findById(id);
}

async function findByIdAndUpdate(id, update) {
  return kioskModel.findByIdAndUpdate(id, update, {
    upsert: false,
    new: true,
  });
}

async function findByIdAndDelete(id) {
  return kioskModel.findByIdAndDelete(id);
}

async function findOne(filter) {
  return kioskModel.findOne(filter);
}

module.exports = {
  create,
  find,
  findById,
  findByIdAndUpdate,
  findByIdAndDelete,
  findOne,
};
