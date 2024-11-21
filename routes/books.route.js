const router = require('express').Router();
const getBooks = require('../services/getBooks');
const addBooks = require('../services/addBooks');
const deleteBooks = require('../services/deleteBooks');
const getFaculties = require('../services/getFaculties');
const getDepartments = require('../services/getDepartments');
const logger = require('../config/logger');
const { checkRaw } = require('../middlewares/token');

router.post('/', (req, res) => {
  getBooks(req, req.body, (err, results) => {
    if (err) {
      res.status(500).json({
        ok: 0,
        e: err,
      });
      return logger.error(err);
    }

    res.json({
      ok: 1,
      d: results,
    });
  }).then(() => {});
});

router.post('/add', checkRaw, (req, res) => {
  const user_id = req.decoded.data.id;

  addBooks(req, user_id, req.body, (err, results) => {
    if (err) {
      res.status(500).json({
        ok: 0,
        e: err,
      });
      return logger.error(err);
    }

    res.json({
      ok: 1,
      d: results,
    });
  }).then(() => {});
});

router.post('/delete', checkRaw, (req, res) => {
  const user_id = req.decoded.data.id;

  deleteBooks(req, user_id, req.body, (err, results) => {
    if (err) {
      res.status(500).json({
        ok: 0,
        e: err,
      });
      return logger.error(err);
    }

    res.json({
      ok: 1,
      d: results,
    });
  }).then(() => {});
});

router.post('/faculties', (req, res) => {
  getFaculties(req, req.body, (err, results) => {
    if (err) {
      res.status(500).json({
        ok: 0,
        e: err,
      });
      return logger.error(err);
    }

    res.json({
      ok: 1,
      d: results,
    });
  }).then(() => {});
});

router.post('/departments', (req, res) => {
  getDepartments(req, req.body, (err, results) => {
    if (err) {
      res.status(500).json({
        ok: 0,
        e: err,
      });
      return logger.error(err);
    }

    res.json({
      ok: 1,
      d: results,
    });
  }).then(() => {});
});

module.exports = router;
