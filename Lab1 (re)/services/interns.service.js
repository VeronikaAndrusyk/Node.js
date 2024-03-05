const mockData = require('../helpers/mock-data');

function _generateId() {
    const crypto = require("crypto");
    return crypto.randomBytes(16).toString("hex");
}

async function create(intern) {
    const newIntern = { id: _generateId(), ...intern };
    mockData.interns.push(newIntern);

    return newIntern;
}

async function find({ searchString = '', page = 1, perPage = Number.MAX_SAFE_INTEGER }) {
    searchString = searchString?.toLowerCase();
    const searchResult = mockData.interns.filter(u => u.lastName?.toLowerCase().includes(searchString));

    return {
        items: searchResult.slice((page - 1)*perPage, page * perPage),
        count: searchResult.length,
    }
}

async function findById(id) {
    return mockData.interns.find(u => u.id == id);
}

async function update(internId, internData) {
    const index = mockData.interns.findIndex(u => u.id === internId);

    if (index === -1) return;

    const updatedIntern = { ...mockData.interns[index], ...internData, id: internId };

    mockData.interns[index] = updatedIntern;
};

async function remove(id) {
    mockData.interns = mockData.interns.filter(u => u.id != id);
};

module.exports = {
    create,
    find,
    findById,
    update,
    remove,
};
