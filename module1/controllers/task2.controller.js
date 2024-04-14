const createError = require('http-errors');
const task2Model = require('../models/task2.model');

async function calculateExpression(req, res, next) {
    try {
        const { x, a, n } = req.body;
        if (!x || !a || !n) {
            return res.status(400).json({
                status: 400,
                message: "Параметри 'x', 'a' та 'n' є обов'язковими."
            });
        }
        let result = 0;
        let currentTerm = x + a;

        for (let i = 0; i < n; i++) {
            result += Math.pow(currentTerm, 2);
            currentTerm += a;
        }

        result += Math.pow(a, 2) + a;

        res.status(200).json({
            status: 200,
            result: result,
        });
    } catch (err) {
        next(createError.InternalServerError(err.message));
    }
}

module.exports = {
    calculateExpression
};