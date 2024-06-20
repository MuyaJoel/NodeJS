import {PrismaClient} from '@prisma/client'
import { query,validationResult,matchedData,body,checkSchema } from "express-validator"

const prisma=new PrismaClient()


//getting all users
export const getUsers=async (req,res)=>{
   try{
    const users=await prisma.userData.findMany()
    console.log(users)
    return res.json(users)
   }catch(error){
    res.status(500).json({
        status: "error",
        message: error.message
    });

   }
}

//getting a specific user
export const getSpecificUser=async (req,res)=>{
    const {parseId,findUser}=req
    // const findUser=await prisma.userData.findUnique({
        // where:{id:parseId}
    // })
    if(findUser){
        res.cookie('findUser', JSON.stringify(findUser)), {httpOnly:true}
        res.status(200).json({
            status:"Success",
            data:{findUser}
        })
    }else{
        res.status(400).json({
            message: 'user not found'
        })
    }
    
}

//create a user.
export const createUser=async (req,res)=>{
    const errors = validationResult(req)

    if(!errors.isEmpty()) {
        return res.status(400).json({
            status:"Bad",
            data:{errors}
        })
    }

    const data = matchedData(req)
    const user=await prisma.user.create({
        data:{data}
    })
    res.status(200).json({
        status:"success",
        data:{user}
    })
}
//update the all user object
export const updateUserObj=async(req,res)=>{
    const {parseId}=req
    const data = matchedData(req)
    const updateUser=await prisma.userData.update({
        where:{id:parseId},
        data:{...data}
    })
    res.sendStatus(200).send(updateUser)
}


//update a user
export const updateUser=(req,res)=>{
    const {parseId}=req
    const data = matchedData(req)
    // userData[findIndex]={...userData[findIndex],...data}
    console.log('User Updated')
    // return res.status(200).send(userData[findIndex])
}

//delete a user
export const deleteUser=async (req,res)=>{
    const {parseId}=req
    // userData.splice(findIndex,1)
    await prisma.userData.delete({
        where:{id:parseId}
    })
    res.sendStatus(200)
}