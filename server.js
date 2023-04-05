//khoi dong network nodejs
const app = require("./src/app");
const PORT = 3005;

const server = app.listen(PORT,()=>{
    console.log(`server listening on port ${PORT}`);
})

process.on('SIGINT',()=>{
    server.close(()=>{
        console.log(`Exit Server Express`)
    })
})