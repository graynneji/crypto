const express = require('express');
const AppError = require('./utils/AppError');
const authRoute = require('./routes/authRoute');
const usersRoute = require('./routes/userRoute');
const tradeRoute = require('./routes/tradeRoute');
const dashboardRoute = require('./routes/dashboardRoute');
const refreshRoute = require("./routes/refreshRoute")
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();
//middlewares
app.use(cookieParser());
app.use(express.json());
// app.use(cors({ 
//   origin: 'https://crypto-ig66.vercel.app',

//   methods: ["GET", "POST", "PATCH", "DELETE"]
// }));
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

//Routes
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/users', usersRoute);
app.use('/api/v1/', tradeRoute);
app.use('/api/v1/', dashboardRoute);
app.use('/api/v1/', refreshRoute);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`));
});

module.exports = app;
