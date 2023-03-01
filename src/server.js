import Express from "express";
import bodyParser from "body-parser";
import authRoute from './routes/authRoutes.js'
import userRoute from './routes/userRoutes.js'
import dotenv from 'dotenv'
const app = Express();

dotenv.config();
app.use(bodyParser.json());
app.use('/auth', authRoute)
app.use('/user', userRoute)

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`HTTP server running on ${port}`);
});
