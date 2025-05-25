import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import { BicycleRoutes } from './app/modules/bicycle/bicycle.routes';
import { OrderRoutes } from './app/modules/order/order.routes';
import { UserRoutes } from './app/modules/user/user.route';
import { AuthRoutes } from './app/modules/auth/auth.route';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';
const app: Application = express();

// https://bicycle-store-client.vercel.app
// parser
app.use(express.json());
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  }),
);

// apps routes
app.use('/api/products', BicycleRoutes);
app.use('/api/orders', OrderRoutes);
app.use('/api/users', UserRoutes);
app.use('/api/auth', AuthRoutes);

//global error handler
app.use(globalErrorHandler);

app.get('/', (req: Request, res: Response) => {
  // console.log(process.cwd());
  res.send('Welcome to Bicycle Store');
});

app.use(notFound);
//not found

export default app;
