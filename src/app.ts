import cors from "cors"
import express, { Application, Request, Response } from 'express'
import { BicycleRoutes } from "./app/modules/bicycle/bicycle.routes"
const app: Application = express()

// parser
app.use(express.json())
app.use(cors())

// apps routes
app.use('/api/products', BicycleRoutes)

app.get('/', (req: Request, res: Response) => {
    console.log(process.cwd());
  res.send('Hello world')
})
export default app
