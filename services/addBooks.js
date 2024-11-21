const pool = require('../config/database');

module.exports = async (req, user_id, data, cb) => {
  pool.query(
    `INSERT INTO dic_books (fac_id, dep_id, name, author_name, notes, publish_year)
        VALUES (?, ?, ?, ?, ?, ?)`,
    [
      data['fac_id'],
      data['dep_id'],
      data['name'],
      data['author_name'],
      data['notes'],
      data['publish_year'],
    ],
    (err, resData) => {
      if (err) return cb(err);

      const { insertId } = resData;
      const notes = `${data['qty']}ta yangi kitob qo'shildi`;
      const curdate = new Date().toISOString().slice(0, 10);

      pool.query(
        `INSERT INTO doc_lib (type_id, book_id, qty, notes, curdate)
         VALUES (?, ?, ?, ?, ?)`,
        [1, insertId, data['qty'], notes, curdate],
        (err, _) => {
          if (err) return cb(err);

          cb(null, resData);
        }
      );
    }
  );
};
