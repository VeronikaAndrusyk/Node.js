const internService = require("../services/interns.service");
const fs = require("fs"); // Підключення модуля fs для роботи з файловою системою

async function createIntern(req, res) {
  try {
    const newIntern = await internService.create(req.body);
    internService.addIntern(newIntern); // Додати нового інтерна до mock-даних

    // Зберігання нового інтерна у файл JSON
    const internData = JSON.stringify(newIntern, null, 2);
    fs.appendFileSync("interns.json", internData); // Запис у файл

    res.status(201).json({ // Код 201 вказує на успішне створення ресурсу
      status: 201,
      message: "Intern created successfully.",
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
    const interns = await internService.find(req.query);

    res.status(200).json({
      status: 200,
      data: interns,
    });
  } catch (err) {
    console.error(err);

    let errorMessage = "Internal server error. Please try again later.";
    let statusCode = 500;

    // Уточнення можливих помилок
    if (err.name === "DatabaseConnectionError") {
      errorMessage = "Database connection error. Unable to retrieve interns.";
      statusCode = 503; // недоступний сервер
    } else if (err.name === "InvalidQueryError") {
      errorMessage = "Invalid query error. Unable to retrieve interns.";
      statusCode = 400; // некоректний запит
    }

    res.status(statusCode).json({
      status: statusCode,
      error: errorMessage,
    });
  }
}

async function getIntern(req, res) {
  try {
    const { internId } = req.params;
    const intern = await internService.findById(internId);

    if (!intern) {
      return res.status(404).json({
        status: 404,
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
      error: "Internal server error. Please try again later.",
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
      message: "Intern updated successfully.",
    });
  } catch (err) {
    console.error(err);

    let errorMessage = "Internal server error. Please try again later.";
    let statusCode = 500;

    if (err.name === "ValidationError") {
      errorMessage = "Validation error. Please provide valid intern data.";
      statusCode = 400; // Bad Request
    } else if (err.name === "NotFound") {
      errorMessage = "Intern not found. Unable to update.";
      statusCode = 404; // Not Found
    }

    res.status(statusCode).json({
      status: statusCode,
      error: errorMessage,
    });
  }
}

async function deleteIntern(req, res) {
  try {
    const { internId } = req.params;
    await internService.remove(internId);

    res.status(200).json({
      status: 200,
      message: "Intern deleted successfully.",
    });
  } catch (err) {
    console.error(err);

    let errorMessage = "Internal server error. Please try again later.";
    let statusCode = 500;

    if (err.name === "NotFound") {
      errorMessage = "Intern not found. Unable to delete.";
      statusCode = 404; // Not Found
    }

    res.status(statusCode).json({
      status: statusCode,
      error: errorMessage,
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
