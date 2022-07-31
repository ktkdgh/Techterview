var createError = require('http-errors');
var path = require('path');
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var dotenv = require('dotenv');
dotenv.config();

var indexRouter = require('./routes/index');
var authRouter = require('./routes/auth');
var feedbackRouter = require('./routes/feedback');
var questionListRouter = require('./routes/questionList');
var aloneRouter = require('./routes/training/alone');
var othersRouter = require('./routes/training/others');

//socket//

const http = require("http");
var express = require('express');
var cors = require('cors');
const SocketRoutes = require("./socketRoutes");

const app = express();
const SocketIO = require("socket.io");
const server = http.createServer(app);
// const io = require("socket.io")(8000, { cors:{ origin: ['https://techterview.vercel.app:3000']} });

const io = SocketIO(server, {
  cors: {
    origin: "*",
    method: ["GET", "POST"],
  },
});

PORTNUM = 8000;

app.use(cors());
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(express.json());
app.use("/", require("./routes/"));


io.on("connection", (socket) => {
  socket.onAny(e => {
    console.log(`SOCKET EVENT::::::${e}`);
  });
  // Connection
  SocketRoutes.video.createRoom(socket, SocketRoutes.video.event.createRoom);
  SocketRoutes.video.enterWaitRoom(socket, SocketRoutes.video.event.enterWaitRoom);
  SocketRoutes.video.checkUserNum(socket, SocketRoutes.video.event.checkUserNum);
  SocketRoutes.video.recordingMemberId(socket, SocketRoutes.video.event.recordingMemberId);
  SocketRoutes.video.disconnecting(socket, SocketRoutes.video.event.disconnecting);
  SocketRoutes.video.joinRoom(socket, SocketRoutes.video.event.joinRoom);
  SocketRoutes.video.sttSoket(socket, SocketRoutes.video.event.sttSoket);
  })

  
server.listen(PORTNUM, () => {
  console.log(`Server is running... port: ${PORTNUM}`);
});
////////////


const { sequelize } = require('./models/index');
const { Socket } = require('dgram');
sequelize.sync({ force: false })
  .then(() => {
    console.log('Database connected OK!');
  })
  .catch((err) => {
    console.error(err);
  });


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(session({ secret: 'MySecret', resave: false, saveUninitialized: true }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/auth', authRouter);
app.use('/api/feedback', feedbackRouter);
app.use('/api/questionList', questionListRouter);
app.use('/api/training/alone', aloneRouter);
app.use('/api/training/others', othersRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
