const express       = require("express")
const mongoose      = require("mongoose")
const morgan        = require('morgan')
const bodyParser    = require('body-parser')


const User      = require("./models/user")
const AuthRoute = require('./routes/auth')    

require("dotenv/config")

mongoose.connect(
    process.env.ORIG_DB_CONNECTION_STRING, 
    {useUnifiedTopology: true, useNewUrlParser: true}   
    //,(req,res)=> {
    //console.log("Connected to the database");}
)

const db = mongoose.connection

db.on('error', (err)=> {
    console.log(err)
})

db.once('open', ()=>{
    console.log('Database Connection Established')
})

const app = express()

app.use(express.json())

//app.use(morgan('dev'))
//app.use(bodyParser.urlencoded({extended: true}))
//app.use(bodyParser.json())

app.get("/", (req, res)=>{
    res.send("WELCOME TO ALAMPAT!")
})


app.get("/users", (req, res)=>{

    let users = ["Lito", "Jazzy", "Kasuy", "Tita", "Calooy"]
    res.send({
        users: users,
    })
})

app.post("/create_user", async (req, res) => {
    try{
        const myuser = new User(req.body)
        await myuser.save()
        res.send(myuser)
    }catch(err){
        res.send({
            message:err
        })
    }
})



app.listen(3000, ()=> {
    console.log("Listening to 3000");
})

app.use('/user', AuthRoute)