import { userData } from "../assert/database/userData.mjs"
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
        status:"Success",
        data:{findUser}
    })
}

//create a user.
export const createUser=(req,res)=>{
    const errors = validationResult(req)

    if(!errors.isEmpty()) {
        return res.status(400).json({
            status:"Bad",
            data:{errors}
        })
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
    const {findIndex,parseId}=req
    const data = matchedData(req)
    userData[findIndex]={id:parseId, ...data}
    res.sendStatus(200)
}


//update a user
export const updateUser=(req,res)=>{
    const {findIndex}=req
    const data = matchedData(req)
    userData[findIndex]={...userData[findIndex],...data}
    console.log('User Updated')
    return res.status(200).send(userData[findIndex])
}

//delete a user
export const deleteUser=(req,res)=>{
    const {findIndex}=req
    userData.splice(findIndex,1)
    res.sendStatus(200)
}