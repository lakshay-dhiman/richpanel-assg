const express = require('express')
const app = express()
var cors = require('cors')

// environment variable config
const dotenv = require('dotenv')
dotenv.config()

//mongoose config
const mongoose = require('mongoose')
mongoose.connect(process.env.MONGO_CONNECT,
    ()=>{console.log('db connected')}
  )


//middlewares
app.use(express.json())
app.use(cors())

const auth_route = require('./app/routes/auth')
const payments_route = require('./app/routes/payments')
const subscription_route = require('./app/routes/subscriptions')
//routing middlewares
app.use('/api/auth',auth_route)
app.use('/api/payments',payments_route)
app.use('/api/subscriptions',subscription_route)



// initialise application
const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`The app is listening on port ${port}`)
})


app.get('/',(req,res)=>{
  return res.send("welcome to the richpanel challenge app")
})
