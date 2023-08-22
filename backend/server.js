const mongoose = require('mongoose');
const { updateDividends } = require('./dividendsUpdater');
const cron = require('node-cron');
const http = require('http');
const socketIo = require('socket.io');
const WebSocket = require('ws');
const dotenv = require('dotenv');
const app = require('./app');

dotenv.config({ path: './config.env' });

const server = http.createServer(app);
const io = socketIo(server);

const port = process.env.PORT || 9001;

io.on('connection', (socket) => {
  console.log('client connected');
  const emitMarketData = () => {
    const socketAPI = new WebSocket(process.env.API_URL);

    socketAPI.on('open', () => {
      console.log('Websocket open');
    });

    socketAPI.on('message', (data) => {
      const marketData = JSON.parse(data);
      socket.emit('crypto', marketData);
    });

    socketAPI.on('close', () => {
      console.log('Websocket closed');
    });
  };
  emitMarketData();
  socket.on('disconnect', () => {
    console.log('client disconnected');
  });
  const dataInterval = setInterval(emitMarketData, 5000);
  socket.on('disconnect', () => {
    console.log('Client disconnected');
    clearInterval(dataInterval);
  });
});

const DB = process.env.DATABASE;
mongoose
  .connect(DB)
  .then(() => console.log('Database connected'))
  .catch((err) => console.log(err));

// cron.schedule('0 0 * * *', dividendsUpdater.updateDividends);
cron.schedule('*/60 * * * * *', updateDividends);

server.listen(port, () => {
  console.log(`App running on port ${port}`);
});
