import 'dotenv/config'
import express from 'express';
import  ApiRoutes  from './routes/api.routes.js';
import { __dirname } from './utils/utils.js';
import { errorHandler } from './middlewares/errorHandler.js';
import passport from 'passport';
import session from 'express-session';
import './passport/google.js';
import cookieParser from 'cookie-parser';
import handlebars from "express-handlebars";
import { info } from './docs/info.js';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { logger } from './logs/news.logs.js';
const apiRoutes = new ApiRoutes().getRouter()


const app = express();
const specs = swaggerJSDoc(info);
const PORT = process.env.PORT || 3000;

app.use('/docs',swaggerUi.serve,swaggerUi.setup(specs));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/../public'));
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/../views");
app.set("view engine", "handlebars");
app.use(session({
  secret: '12345',
  resave: false,
  saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(errorHandler);
app.use('/', apiRoutes);

const server  = app.listen(PORT, () => {
  logger.info(`🚀 Server started on port http://localhost:${PORT}`)
});
server.on("error", (err) => console.log(err));