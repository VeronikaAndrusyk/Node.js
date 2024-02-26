const internService = require("../services/interns.service");

async function createIntern(req, res) {
  try {
    const newIntern = await internService.create(req.body);

    res.status(200).json({
      status: 200,
      data: newIntern,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: 500,
      error: err,
    });
  }
}

async function getInterns(req, res) {
  try {
    res.status(200).json({
      status: 200,
      data: await internService.find(req.query),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: 500,
      error: err,
    });
  }
}

async function getIntern(req, res) {
  try {
    const { internId } = req.params;
    const intern = await internService.findById(internId);

    if (!intern) {
      return res.status(400).json({
        status: 400,
        message: "Intern not found.",
      });
    }

    res.status(200).json({
      status: 200,
      data: intern,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: 500,
      error: err,
    });
  }
}

async function updateIntern(req, res) {
  try {
    const { internId } = req.params;
    const internData = req.body;
    await internService.update(internId, internData);

    res.status(200).json({
      status: 200,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: 500,
      error: err,
    });
  }
}

async function deleteIntern(req, res) {
  try {
    const { internId } = req.params;
    await internService.remove(internId);

    res.status(200).json({
      status: 200,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: 500,
      error: err,
    });
  }
}

module.exports = {
  createIntern,
  getInterns,
  getIntern,
  updateIntern,
  deleteIntern,
};
