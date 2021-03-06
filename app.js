const express = require('express');
const logger = require('morgan');
const path = require('path');
const hbs = require('hbs');
const session = require('express-session');
const redis = require('redis');
const RedisStore = require('connect-redis')(session);
const checkUser = require('./middleware/checkUser');
const checkUserTypeCon = require('./middleware/checkUserTypeCon')
const checkUserTypeStu = require('./middleware/checkUserTypeStu');


const { UserType, Country, University } = require('./src/db/models');
const authUser = require('./middleware/authUser');

const redisClient = redis.createClient();

const routes = require(path.join(process.env.PWD, 'src', 'routes'));

const app = express();
const PORT = 3000;

app.set('view engine', 'hbs');
app.set('views', path.join(process.env.PWD, 'src', 'views'));

hbs.registerPartials(path.join(process.env.PWD, 'src', 'views', 'partials'));

const sessionConfig = {
  store: new RedisStore({ host: 'localhost', port: 6379, client: redisClient }),
  key: 'sid',
  secret: 'secret',
  resave: false,
  saveUninitialized: false,
  httpOnly: true,
  cookie: { expires: 24 * 60 * 60e3 },
};


app.use(session(sessionConfig));
app.use(checkUser);

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// app.use((req, res, next) => {
//   res.locals.user = req.session.user;
//   next();
// });

//app.use('/', routes.main);
app.use('/auth', routes.auth);
app.use('/contributor', checkUserTypeStu ,routes.contributor);
app.use('/student', checkUserTypeCon ,routes.student);
app.use('/videos', routes.videos);
app.use('*', (req,res) => {
  res.redirect('/auth/register')
})

// app.use('/entries', routes.entries);

app.listen(PORT, () => {
  console.log(`server started PORT: ${PORT}`);
});
