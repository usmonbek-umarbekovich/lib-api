const pool = require('../config/database');

module.exports = async (req, data, cb) => {
  const { fac_id, dep_id, name, limit, skip, book_id } = data;

  let facCondition = fac_id
    ? `(SELECT fac_id FROM dic_books WHERE id=book_id)=?`
    : 'TRUE';
  let depCondition = dep_id
    ? `(SELECT dep_id FROM dic_books WHERE id=book_id)=?`
    : 'TRUE';
  let nameCondition = name
    ? `(SELECT name FROM dic_books WHERE id=book_id) LIKE ?`
    : 'TRUE';
  let bookIdCondition = book_id ? `book_id=?` : 'TRUE';
  let limitCondition = limit ? `LIMIT ?` : '';
  let skipCondition = skip ? `OFFSET ?` : '';

  let queryParams = [];
  if (fac_id) queryParams.push(fac_id);
  if (dep_id) queryParams.push(dep_id);
  if (book_id) queryParams.push(book_id);
  if (name) queryParams.push(`%${name}%`);
  if (limit) queryParams.push(limit);
  if (skip) queryParams.push(skip);

  pool.query(
    `
    SELECT book_id, SUM(qty) as ost,
      (SELECT name FROM dic_books WHERE id=book_id) as book_name,
      (SELECT author_name FROM dic_books WHERE id=book_id) as book_author,
      (SELECT notes FROM dic_books WHERE id=book_id) as book_notes,
      (SELECT publish_year FROM dic_books WHERE id=book_id) as book_publish_year,
      (SELECT name FROM dic_faculty WHERE id=(SELECT fac_id FROM dic_books WHERE id=book_id)) as fac_name,
      (SELECT name FROM dic_department WHERE id=(SELECT fac_id FROM dic_books WHERE id=book_id)) as dep_name
      FROM trs_lib
      WHERE ${facCondition} AND
            ${depCondition} AND
            ${nameCondition} AND
            ${bookIdCondition}
      GROUP BY book_id
      HAVING ost > 0
      ORDER BY book_publish_year DESC, book_id DESC
      ${limitCondition} ${skipCondition};`,
    queryParams,
    (err, resData) => {
      if (err) return cb(err);

      cb(null, resData);
    }
  );
};
