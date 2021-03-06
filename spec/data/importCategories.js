const fs = require('fs');
const mongoose = require('mongoose');
const Category = mongoose.model('Category');

const run = async (file = 'categories.json') => {
  const json = JSON.parse(fs.readFileSync(`${__dirname}/seed/${file}`));
  return new Promise((resolve, reject) => {
    try {
      Category.insertMany(json).then(() => {
        return resolve();
      });
    } catch(e) {
      return reject();
    }
  });
};

module.exports = {
  run
}