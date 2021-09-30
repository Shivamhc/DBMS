const { Pool } = require('pg');

const pool = new Pool()
module.exports = {
  query: (text, params) => pool.query(text, params),
}

/* module.exports.query = function (text, values, callback) {
  console.log('query:', text, values);
  return pool.query(text, values, callback);
};

module.exports.connect = function (callback) {
  return pool.connect(callback);
}; */