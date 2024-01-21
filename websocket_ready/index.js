const express = require('express')
const { Server } = require('socket.io')
const http = require("http")
const cors = require("cors")
const { userModel, addressFinder, attribute_adder } = require('./mongo')
var bodyParser = require("body-parser");

// initation
const routes = express.Router()

const app = express();
app.use(cors())


const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  },
});



io.on("connection", (socket) => {
  // console.log(`user connected: ${socket.id}`)

  socket.once('address', async (e) => {

    // console.log(typeof e.email)


    // console.log('logged sei address is: ' +e);  
    a = await addressFinder(e)

    // console.log(alldata)

    if (a === false) {
      const user = userModel({
        address: e,
        twitter: '',
        discord: '',
        quote_link: '',
        zily_username: ''
      })

      await user.save()

      socket.emit('data', await addressFinder(e))

    } else{

      socket.emit('data', a)
      
    }


  })


  socket.on('twitter', async (e)=>{
    // console.log('twiter '+e);
   a = await attribute_adder(e)

   socket.emit('socialConformation', a)
   
  })

  socket.on('discord', async (e)=>{
    attribute_adder(e)
  })

  socket.on('quote_link', async (e)=>{
    attribute_adder(e)

  })

  socket.on('zily_username', async (e)=>{
    attribute_adder(e)
  })

})


app.use(routes)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
server.listen(3001, () => {
  console.log("server is running on 3001")
})

