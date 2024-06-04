const { v4 : uuidv4 } =require('uuid')
const { format } =require('date-fns')

const fs =require('fs')
const fsPromise =require('fs').promises
const path =require('path')



const LogEvents= async (msg)=>{
    try{
        process.on('uncaughtException', (error)=>{
            console.log(`Uncaught Exception: ${error}`)
            process.exit(1)
        })
        const folderPath=path.join(__dirname, 'Logs')
        if(!fs.existsSync(folderPath)){
            fs.mkdirSync(folderPath)
        }
    
        const newId= await uuidv4()
        const date = await format(new Date(), 'yyyyMMdd\tHH:mm:ss')
        const logItem=`\nHey,today in on ${date} , Unique Id is ${newId}`
    
        await fsPromise.appendFile(path.join(__dirname,'Logs','eventLogs.txt'),logItem )
        console.log(msg)
        
    }catch(err){
        throw err
    }
}

module.exports=LogEvents