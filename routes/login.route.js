const router = require('express').Router();
const pool = require('../config/database');
const { sign } = require('jsonwebtoken');
const logger = require('../config/logger');

router.post('/', (req, res) => {
  pool.query(
    `
    SELECT id, fio,
      1 as inTime,                        
      2880 as expiresInMinute                        
    FROM dic_teachers WHERE login=? AND psw=? AND IFNULL(psw,'')<>'' `,
    [req.body['login'], req.body['psw']],
    (err, results) => {
      if (err) {
        res.status(500).json({
          ok: 0,
          m: 'Incorrect user or/and password',
        });
        return logger.error(err);
      }
      if (results.length == 0) {
        res.status(500).json({
          ok: 0,
          m: 'Incorrect user or/and password',
        });
        return logger.error(err);
      }

      if (results && results.length > 0) {
        if (results[0]['inTime'] === 0) {
          return res.status(410).json({
            ok: 0,
            m: 'Not in period',
          });
        }

        const jsonToken = sign(
          { data: results[0] },
          process.env.JWT_KEY,
          {
            expiresIn: results[0]['expiresInMinute'] + 'm',
          },
          null
        );

        res.json({
          ok: 1,
          m: 'Access granted',
          d: {
            id: results[0]['id'],
            name: results[0]['fio'],
            phone: req.body.phone,
            expiresInMinute: results[0]['expiresInMinute'],
            app: 'A',
          },
          token: jsonToken,
        });
      } else {
        res.status(401).json({
          ok: 0,
          m: 'Incorrect user or/and password',
        });
      }
    }
  );
});

module.exports = router;
