import express from 'express';
import dotenv from 'dotenv';
import cors from "cors";
import cookieParser from  "cookie-parser";
import fileUpload from 'express-fileupload';
import userrouter from './routes/userrouter.js'

import applicationrouter from './routes/applicationrouter.js'
import jobrouter from './routes/jobrouter.js'
import {dbconnection} from './database/dbconnection.js'

import {errormidlewares} from './midlewares/error.js'



const app = express()
dotenv.config( { path: "./config/config.env"} );
app.use(cors({
    origin:[process.env.frontend_url],
    methods:[ 'GET,POST,DELETE,PUT' ],
    credentials: true,

})
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir:"/temp/",
}));

app.use('/api/v1/user', userrouter);
app.use('/api/v1/application', applicationrouter);
app.use('/api/v1/job', jobrouter);


dbconnection();
app.use(errormidlewares)


export default app; 