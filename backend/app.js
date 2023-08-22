const express = require('express');
const AppError = require('./utils/AppError');
const authRoute = require('./routes/authRoute');
const usersRoute = require('./routes/userRoute');
const tradeRoute = require('./routes/tradeRoute');
const dashboardRoute = require('./routes/dashboardRoute');

const app = express();
//middlewares
app.use(express.json());

//Routes
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/users', usersRoute);
app.use('/api/v1/', tradeRoute);
app.use('/api/v1/', dashboardRoute);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`));
});

module.exports = app;
