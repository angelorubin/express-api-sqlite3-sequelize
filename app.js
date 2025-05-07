const sequelize = require('./config/database');
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const userRoutes = require('./modules/users/routes');

const app = express();
app.use(express.json());
const port = 3001;

// Sincroniza os modelos com o banco de dados
sequelize.sync({ force: true })
  .then(() => {
    console.log('Modelos sincronizados com o banco de dados.');
    app.listen(port, () => {
      console.log(`Servidor Express rodando em http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error('Erro ao sincronizar os modelos:', error);
  });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const myLogger = function (req, res, next) {
  console.log('LOGGED', req, res)
  next()
}

app.use(myLogger)
// routes
app.use('/users', userRoutes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
