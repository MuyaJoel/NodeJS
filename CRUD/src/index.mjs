import express from "express"
import {readFile, writeFile} from "node:fs/promises"
import { fileURLToPath } from "node:url"
import path from "node:path"
import { query,validationResult,matchedData,body,checkSchema } from "express-validator"
import { createSchema } from "./schema/schema.mjs"

// const __dirname=path.dirname(fileURLToPath(import.meta.url))
// const userData =await readFile(path.join(__dirname,'files','userData.json'),'utf-8')
// const writeData=await writeFile(path.join(__dirname,'files','userData.json'))
const userData=[
    {
        "id": 1,
        "username": "alamin254",
        "displayName": "Alamin"
    },
    {
        "id": 2,
        "username": "danielWizzy",
        "displayName": "Daniel"
    },
    {
        "id": 3,
        "username": "PamSpider",
        "displayName": "Parmenas"
    },
    {
        "id": 4,
        "username": "PerlChocolate",
        "displayName": "Perl"
    },
    {
        "id": 5,
        "username": "Felicity",
        "displayName": "Felistus"
    }
    ]
//middleware
const resolveByIndex=(req,res,next)=>{
    const {body,params:{id}}=req
    const parseId=parseInt(id)

    if(isNaN(parseId))
        return res.sendStatus(400)

    const findIndex=userData.findIndex((user)=>{
        return user.id===parseId
    })

    if(findIndex===-1)
        return res.sendStatus(404)
    req.findIndex=findIndex
    req.parseId=parseId
    next()
}

const app =express()

//we need a middle ware when passing a body of certain type
app.use(express.json())

app.get('/api/users',(req,res)=>{
    res.send(userData)
})

//getting data of a specific user
app.get('/api/users/:id',resolveByIndex,(req,res)=>{
    const {findIndex}=req
    const findUser=userData[findIndex]
    res.send(findUser)
})

//posting new data
app.post('/api/users',checkSchema(createSchema),(req,res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
    }
    const data = matchedData(req)
    const newUser={id:userData[userData.length -1].id+1, ...data}

    userData.push(newUser)
    return res.status(201).send(newUser)
})

//Put request
app.put('/api/users/:id',resolveByIndex,checkSchema(createSchema),(req,res)=>{
    const {body,findIndex,parseId}=req
    userData[findIndex]={id:parseId, ...body}
    res.sendStatus(200)
})

//patch request
app.patch('/api/users/:id',resolveByIndex,checkSchema(createSchema),(req,res)=>{
    const {body,findIndex}=req
    userData[findIndex]={...userData[findIndex],...body}

    console.log('User Updated')
    return res.status(200).send(userData[findIndex])
})

//delete requet
app.delete('/api/users/:id',resolveByIndex,(req,res)=>{
   const {findIndex}=req
    userData.splice(findIndex,1)
    res.sendStatus(200)
})
const port =process.env.PORT||3000

app.listen(port,()=>{console.log(`server runs at port ${port}`)})

