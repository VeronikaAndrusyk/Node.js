const internService = require("../services/interns.service");
const createError = require('http-errors');
const bcrypt = require('bcrypt');

async function createIntern(req, res, next) {
  try {
    const _id = await internService.create({
        ...req.body,
        password: await bcrypt.hash(req.body.password, await bcrypt.genSalt(10))
    });

    res.status(200).json({
        status: 200,
        data: { _id },
    });
} catch(err) {
    next(createError.InternalServerError(err.message));
}
};

async function getInterns(req, res, next) {
  try {
    res.status(200).json({
        status: 200,
        data: await internService.find(req.query),
    });
} catch(err) {
    next(createError.InternalServerError(err.message));
}
};

async function getIntern(req, res, next) {
  try {
    const { internId } = req.params;
    const intern = await internService.findById(internId);

    if (!intern) {
        return res.status(400).json({
            status: 400,
            error: {
                message: 'Intern not found.'
            },
        });
    }

    res.status(200).json({
        status: 200,
        data: intern,
    });
} catch(err) {
    next(createError.InternalServerError(err.message));
}
};


async function updateIntern(req, res, next) {
  try {
    const { internId } = req.params;
    const internData = req.body;
    await internService.findByIdAndUpdate(internId, internData);

    res.status(200).json({
        status: 200,
    });
} catch(err) {
    next(createError.InternalServerError(err.message));
}
};

async function deleteIntern(req, res, next) {
  try {
    const { internId } = req.params;
    await internService.findByIdAndDelete(internId);

    res.status(200).json({
        status: 200,
    });
} catch(err) {
    next(createError.InternalServerError(err.message));
}
};


module.exports = {
  createIntern,
  getInterns,
  getIntern,
  updateIntern,
  deleteIntern,
};
