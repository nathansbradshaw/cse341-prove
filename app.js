const path = require('path');
const cors = require('cors') // Place this with other requires (like 'path' and 'express')

const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session')

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
const liveChat = require('./routes/liveChat')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json())
app.use(
  session({
    // Simple and not very secure session
    secret: 'random_text',
    cookie: {
      httpOnly: false // Permit access to client session
    }
  })
)
app.use('/', liveChat)
app.use(shopRoutes);
app.use(routeRoutes);


  

app.use(errorController.get404);

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  socket.on('chat message', (msg) => {
    console.log('message: ' + msg);
  });

  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });

  socket.on('newUser', (username, time) => {
    // A new user logs in.
    const message = `${username} has logged on.`
    socket.broadcast.emit('newMessage', {
     message,
     time,
      from: 'Server'
    }) // <-----TODO-----
  });
  socket.on('message', data => {
    // Receive a new message
    console.log('Message received')
    console.log(data)
    socket.broadcast.emit('newMessage', {
      ...data
      /** CONTENT for the emit **/
    }) // <-----TODO----- Note, only emits to all OTHER clients, not sender.
  })

});


http.listen(PORT, () => {
  console.log(`listening on ${PORT}`)
});
