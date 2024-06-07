import { userData } from "../assert/database/userData.mjs"
// import { resolveByIndex } from "../assert/helperFunc/index.mjs"

import { query,validationResult,matchedData,body,checkSchema } from "express-validator"


//getting all users
export const getUsers=(req,res)=>{
    res.status(200).json({
        status:"success",
        data:{userData}
    })
}

//getting a specific user
export const getSpecificUser=(req,res)=>{
    const {findIndex}=req
    const findUser=userData[findIndex]
    res.status(200).json({
        status:"success",
        data:{findUser}
    })
}

//create a user.
export const createUser=(req,res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
    }
    const data = matchedData(req)
    const newUser={id:userData[userData.length -1].id+1, ...data}

    userData.push(newUser)
    res.status(200).json({
        status:"success",
        data:{userData}
    })
}
//update the all user object
export const updateUserObj=(req,res)=>{
    const {body,findIndex,parseId}=req
    userData[findIndex]={id:parseId, ...body}
    res.sendStatus(200)
}


//update a user
export const updateUser=(req,res)=>{
    const {body,findIndex}=req
    userData[findIndex]={...userData[findIndex],...body}

    console.log('User Updated')
    return res.status(200).send(userData[findIndex])
}

//delete a user
export const deleteUser=(req,res)=>{
    const {findIndex}=req
    userData.splice(findIndex,1)
    res.sendStatus(200)
}