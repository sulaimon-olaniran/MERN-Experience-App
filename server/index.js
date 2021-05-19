import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotnev from 'dotenv'


import experienceRoutes from './routes/experiences.js' 
import usersRoute from './routes/users.js' 





dotnev.config()




const { MONGODB_URI, PORT } = process.env


const app = express()



app.use(express.json({ limit : "30mb", extended: true}))
app.use(express.urlencoded({ limit : "30mb", extended: true}))

app.use(cors())


app.use(express.Router())


app.use('/experiences', experienceRoutes)
app.use('/users', usersRoute)


//welcome url for Heroku when server link is visited
app.get('/', (req, res) => {
    res.send("Welcome to Os-Experience API")
})



const SERVER_PORT = PORT || 5000


mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex : true })
.then(() =>{
    app.listen(SERVER_PORT, () => console.log(`Server running on port: ${SERVER_PORT}`))
})
.catch(err =>{
    console.log(err)
})

mongoose.set('useFindAndModify', false)
