import express,{json} from 'express'
import productSRouter from './routes/productRoutes'




const app = express()

//middlewares
app.use(json())
app.use("/products", productSRouter)

//start

app.listen(4000, ()=>{ console.log("Server Running..")})