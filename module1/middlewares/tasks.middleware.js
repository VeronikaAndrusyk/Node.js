const createError = require('http-errors');
const ObjectId = require('mongoose').Types.ObjectId;

async function rectangleDataValidation(req, res, next) {
    const { length, width } = req.body;
    
    try {
      if (!length || !width) {
        throw createError.BadRequest("Довжина та ширина прямокутника є обов'язковими полями.");
      }
  
      next();
    } catch (err) {
      next(err);
    }
  }
  
  module.exports = {
    rectangleDataValidation,
  };