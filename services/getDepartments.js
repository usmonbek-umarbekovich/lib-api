const pool = require('../config/database');

module.exports = async (req, data, cb) => {
  const { fac_id } = data;

  pool.query(
    `
    SELECT id as dep_id, name as dep_name
    FROM dic_department
    WHERE fac_id = ?;`,
    [fac_id],
    (err, resData) => {
      if (err) return cb(err);

      cb(null, resData);
    }
  );
};
