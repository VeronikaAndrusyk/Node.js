const bookService = require("../services/interns.service");

async function createIntern(req, res) {
  try {
    console.log("Request Body:", req.body);
    const newInternData = req.body;
    const newIntern = await internService.create(newInternData);

    res.status(201).json({
      status: 201,
      data: newBook,
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
      data: await internService.find({}),
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
    const { id } = req.params;
    const intern = await internService.findById(id);

    if (!intern) {
      return res.status(404).json({
        status: 404,
        message: "Intern not found.",
      });
    }

    res.status(200).json({
      status: 200,
      data: book,
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
    const { id } = req.params;
    const internData = req.body;
    await internService.findByIdAndUpdate(id, internData);

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
    const { id } = req.params;
    await internService.findByIdAndDelete(id);

    res.status(204).json({
      status: 204,
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
