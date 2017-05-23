let express = require('express');
let load = require('express-load');
let bodyParser = require('body-parser');
let cookieParser = require('cookie-parser');
let expressSession = require('express-session');
let path = require('path');
let methodOverride = require('method-override');
let error = require('./middlewares/error');

let app = express();
let server = require('http').Server(app);
let io = require('socket.io')(server);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cookieParser('ntalk'));
app.use(expressSession({
    secret: 'alskdjflasjdlfjaslkdfjlkajsd',
    resave: false,
    saveUninitialized: false
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

load('models')
    .then('controllers')
    .then('routes')
    .into(app);

io.sockets.on('connection', (client) => {
    client.on('send-server', (data) => {
        var msg = "<b>" + data.nome + ":</b> " + data.msg + "<br>";
        client.emit('send-client', msg);
        client.broadcast.emit('send-client', msg);
    });
});

app.use(error.notFound);
app.use(error.serverError);

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

server.listen(80, () => {
   console.log("Servidor NTalk no Ar...");
});

module.exports = app;
