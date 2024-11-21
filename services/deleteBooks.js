const pool = require('../config/database');

module.exports = async (req, user_id, data, cb) => {
  pool.query(
    `DELETE FROM doc_lib WHERE book_id=?`,
    [data['book_id']],
    (err, _) => {
      if (err) return cb(err);

      pool.query(
        `DELETE FROM dic_books WHERE id=?`,
        [data['book_id']],
        (err, _) => {
          if (err) return cb(err);

          cb(null, { status: 'OK' });
        }
      );
    }
  );
};
