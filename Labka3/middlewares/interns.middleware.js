const createError = require('http-errors');
const Group = require('../models/group.model');

async function validateGroup(req, res, next) {
    try {
        const { group } = req.body;
        const internGroup = group;
        const existingGroups = await Group.find({}, 'name').lean().exec();
        const groupExists = existingGroups.some(existingGroup => existingGroup.name === internGroup);
        if (groupExists) { 
            return next();
        } else { 
            throw new createError.BadRequest("Invalid group. Group must be one of the existing groups A,B,C,D,E.");
        }
    } catch(err) {
        
        return next(err);
    }
}

module.exports = {
    validateGroup,
};
