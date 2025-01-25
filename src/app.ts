import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import { BicycleRoutes } from './app/modules/bicycle/bicycle.routes';
import { OrderRoutes } from './app/modules/order/order.routes';
import { UserRoutes } from './app/modules/user/user.route';
import { AuthRoutes } from './app/modules/auth/auth.route';
const app: Application = express();

// parser
app.use(express.json());
app.use(cors());

// apps routes
app.use('/api/products', BicycleRoutes);
app.use('/api/orders', OrderRoutes);
app.use('/api/users', UserRoutes);
app.use('/api/auth', AuthRoutes);

app.get('/', (req: Request, res: Response) => {
  // console.log(process.cwd());
  res.send('Welcome to Bicycle Store');
});
export default app;
