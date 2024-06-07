import express from "express"
import resolveByIndex from "../assert/helperFunc/index.mjs"
import { createSchema } from "../schema/schema.mjs"
import { checkSchema } from "express-validator"
import { getUsers,createUser,getSpecificUser,updateUserObj,updateUser,deleteUser } from "../controller/controller.mjs"

const router=express.Router()

router.get('/',getUsers)
      

router.post('/',checkSchema(createSchema),createUser)

router.get('/:id',resolveByIndex,checkSchema(createSchema),getSpecificUser)
router.put('/:id',resolveByIndex,checkSchema(createSchema),updateUserObj)
router.patch('/:id',resolveByIndex,checkSchema(createSchema),updateUser)
router.delete('/:id',resolveByIndex,deleteUser)

export default router