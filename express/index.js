const logsFun=require('./LogEvent')
const EventEmitter=require('events')

const myEmitter= new EventEmitter()

myEmitter.on('Logs',(msg)=>{
    return logsFun(msg)
} );

setTimeout(() => {
    myEmitter.emit('Logs','New date and event id has been emitted')   
}, 2000);