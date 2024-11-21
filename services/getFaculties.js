const pool = require('../config/database');

module.exports = async (req, data, cb) => {
  pool.query(
    `SELECT id as fac_id, name as fac_name FROM dic_faculty;`,
    [],
    (err, resData) => {
      if (err) return cb(err);

      cb(null, resData);
    }
  );
};
