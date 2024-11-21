//Аргос проект учун nodejs кисми
require('dotenv').config();
let express = require('express');
let app = express();
let compression = require('compression');
let http = require('http').createServer(app);
let path = require('path');
let cors = require('cors');

app.use(cors());
app.use(express.json({ limit: '128mb' }));
app.use(express.urlencoded({ limit: '128mb', extended: true })); // for parsing application/x-www-form-urlencoded
app.use(require('helmet')());
app.use(compression());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public-flutter')));

const { checkRaw } = require('./middlewares/token');

app.use('/login', require('./routes/login.route'));
app.use('/books', require('./routes/books.route'));

app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  res.json(err);
});

http.listen(process.env.PORT, () => {});
