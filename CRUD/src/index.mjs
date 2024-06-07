import express from "express"
import crudRoutes from "../src/Routes/crudRoutes.mjs"
import router from "../src/Routes/crudRoutes.mjs"

const app=express()
app.use(express.json())

app.use(router)
app.use('/api/users',crudRoutes)
const port =process.env.PORT||3000
app.listen(port,()=>{
    console.log(`Server running at port: ${port}`)
})
