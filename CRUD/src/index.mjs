import express from "express"
// import crudRoutes from "../src/Routes/crudRoutes.mjs"
import router from "../src/Routes/crudRoutes.mjs"
import cookieParser from 'cookie-parser'

const app=express()
app.use(express.json())

app.use(cookieParser)

app.use('/api/users',router)

const port =process.env.PORT||3000
app.listen(port,()=>{
    console.log(`Server running at port: ${port}`)
})
