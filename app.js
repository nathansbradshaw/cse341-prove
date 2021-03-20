const path = require('path');
const cors = require('cors') // Place this with other requires (like 'path' and 'express')

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');

const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const PORT = process.env.PORT || 5000 // So we can run on heroku || (OR) localhost:5000

app.set('view engine', 'ejs');
app.set('views', 'views');

const corsOptions = {
   origin: "https://nathan-cse341.herokuapp.com/",
   optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
const shopRoutes = require('./routes/shop');
const routeRoutes = require('./routes/prove');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json())
app.use(shopRoutes);
app.use(routeRoutes);

app.use(errorController.get404);

io.on('connection', (socket) => {
   console.log('a user connected');
   socket.on('disconnect', () => {
     console.log('user disconnected');
   });
 });

 io.on('connection', (socket) => {
   socket.on('chat message', (msg) => {
     console.log('message: ' + msg);
   });
 });
 io.on('connection', (socket) => {
   socket.on('chat message', (msg) => {
     io.emit('chat message', msg);
   });
 });

http.listen(PORT, () => {
   console.log(`listening on ${PORT}`)
});
