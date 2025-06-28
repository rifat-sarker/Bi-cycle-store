import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';
import router from './app/routes';
const app: Application = express();

// https://bicycle-store-client.vercel.app
// parser

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: [
      'https://bicycle-store-client.vercel.app',
      'http://localhost:5173',
    ],
    credentials: true,
  }),
);


// ✅ Preflight support
app.options('*', cors());

// apps routes
app.use('/api', router);

//global error handler
app.use(globalErrorHandler);

app.get('/', (req: Request, res: Response) => {
  // console.log(process.cwd());
  res.send('Welcome to Bicycle Store');
});

app.use(notFound);
//not found

export default app;
