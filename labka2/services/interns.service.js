const internModel = require("../models/intern.model");


async function create(intern) {
  try {
    const newIntern = { id: _generateId(), ...intern };
    await internModel.create(newIntern); // вик метод create моделі Mongoose для створення нового інтерна
    return newIntern;
  } catch (err) {
    throw err; //  помилка далі для обробки 
  }
}

async function find({
  searchString = "",
  page = 1,
  perPage = Number.MAX_SAFE_INTEGER,
}) {
  try {
    const searchResult = await internModel.find(); // вик. метод find моделі Mongoose для пошуку 
    const count = await internModel.countDocuments(); //  заг кільк
    const items = searchResult.slice((page - 1) * perPage, page * perPage); // виб необхідну сторінку
    return { items, count };
  } catch (err) {
    throw err;
  }
}

async function findById(id) {
  try {
    return await internModel.findById(id); 
  } catch (err) {
    throw err;
  }
}

async function update(internId, internData) {
  try {
    await internModel.findByIdAndUpdate(internId, internData); 
  } catch (err) {
    throw err;
  }
}

async function remove(id) {
  try {
    await internModel.findByIdAndRemove(id); 
  } catch (err) {
    throw err;
  }
}

module.exports = {
  create,
  find,
  findById,
  update,
  remove,
};
