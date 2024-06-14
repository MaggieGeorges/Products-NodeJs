import express,{json} from 'express'
import productRouter from './routes/productRoutes'
import categoryRouter from './routes/categoryRoutes'



const app = express()

//middlewares
app.use(json())
app.use("/Category", categoryRouter)
app.use("/Product", productRouter)

//start

app.listen(4000, ()=>{ console.log("Server Running..")})