const fs = require('fs');
const file = `${__dirname}/equipment-types.json`;
const json = JSON.parse(fs.readFileSync(`${__dirname}/equipment-types.json`, 'utf-8'));
module.exports.equipment = json;
