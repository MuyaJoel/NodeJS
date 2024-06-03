 
  //to solve this we need using promises
  // 1. readFile
  //2:write the file
  // 2. append data 
  // 3: rename file
  // try - catch
const fsPromise=require("fs").promises;

const path = require('path')

process.on('uncaughtException', error =>{
    console.log(`There was an uncaught Exception:${error}`);
    process.exit(1);
})

const filesOps = async() => {
    try {
        //Writing into lorem.txt
        await fsPromise.writeFile(path.join(__dirname , 'files', 'lorem.txt'), 'I have been written')
        //appending text into lorem.txt
        await fsPromise.appendFile(path.join(__dirname, 'files', 'lorem.txt'), '\n\nI have also been appended')
        //appending text into lorem.txt
        await fsPromise.appendFile(path.join(__dirname,'files', 'lorem.txt'), '\n\nDolor esse deserunt et esse dolor.')
        //renaming files
        await fsPromise.rename(path.join(__dirname,'files', 'lorem.txt'),path.join(__dirname,'files','new.txt'), console.log("Aim Renamed"))
        //getting data from the renamed file
        const data = await fsPromise.readFile(path.join(__dirname, 'files', 'new.txt'), {encoding: 'utf8'})
        console.log(data)
    } catch (error) {
      console.log(error)
    }
  }
  filesOps()
 