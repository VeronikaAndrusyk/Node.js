const internService = require("../services/interns.service");
const createError = require('http-errors');

async function createIntern(req, res, next) {
  try {
    const newIntern = await internService.create(req.body);

    res.status(201).json({
      status: 201,
      data: newIntern,
    });
  } catch (err) {
    next(createError.InternalServerError(err.message));
  }
};

async function getInternByLastName(req, res, next) {
  try {
    const { internLastName } = req.params;

    
    const intern = await internService.findByLastName(internLastName);

    if (!intern) {
      
      return res.status(404).json({
        status: 404,
        message: "Intern not found",
      });
    }

    
    res.status(400).json({
      status: 200,
      data: intern,
    });
  } catch (err) {
    
    res.status(500).json({
      status: 500,
      message: err.message || "Internal Server Error",
    });
  }
}


async function getInterns(req, res, next) {
  try {
    res.status(200).json({
        status: 200,
        data: await internService.find(req.query),
    });
} catch (err) {
  next(createError.InternalServerError(err.message));
}
};

async function getIntern(req, res, next) {
  try {
    const { internId, internLastName } = req.params;

    let intern;
    if (internId) {
      intern = await internService.findById(internId);
    } else if (internLastName) {
      intern = await internService.findByLastName(internLastName);
    }

    if (!intern) {
      return res.status(400).json({
        status: 400,
        error: {
          message: 'Intern not found.'
        }
      });
    }

    res.status(200).json({
      status: 200,
      data: intern,
    });
  } catch (err) {
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
} catch (err) {
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
} catch (err) {
  next(createError.InternalServerError(err.message));
}
};

module.exports = {
  createIntern,
  getInterns,
  getInternByLastName,
  getIntern,
  updateIntern,
  deleteIntern,
};
