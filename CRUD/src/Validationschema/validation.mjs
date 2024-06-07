import { userData } from "../assert/database/userData.mjs"

const resolveByIndex=(req,res,next)=>{
    const {params:{id}}=req
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

export default resolveByIndex