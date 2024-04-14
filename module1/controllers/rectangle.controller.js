const createError = require('http-errors');
const rectangleModel = require('../models/rectangle.model');

async function createRectangle(req, res, next) {
    try {
        const { length, width } = req.body;
        
        let area = length * width;
        
        let perimeter = 2 * (length + width);
        
        let request = {
            length: length,
            width: width,
            area: area,
            perimeter: perimeter
        };
        
        const task = await rectangleModel.create(request);

        res.status(200).json({
            status: 200,
            data: rectangle,
        });
    } catch (err) {
        next(createError.InternalServerError(err.message));
    }
}

module.exports = {
    createRectangle
};
