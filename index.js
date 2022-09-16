const express = require('express')
const exphbs = require('express-handlebars')
const session = require('express-session')
const FileStore = require('session-file-store')(session)
const flash = require('express-flash')

const app = express()

const conn = require('./db/conn')

//models
const Tought = require('./models/Tought')
const User   = require('./models/User')



//template engine
app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

//receber resposta do body
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

//sessions midleawares
app.use(
    session({
        name: 'session',
        secret: "nosso_secret",
        resave: false,
        saveUninitialized: false,
        store: new FileStore({
            logFn: function () { },
            path: require('path').join(require('os').tmpdir(), 'sessions'),
        }),
        cookie: {
            secure: false,
            maxAge: 360000,
            expires: new Date(Date.now() + 360000),
            httpOnly: true
        }

    }),
)

// flash message
app.use((flash()))

//public path
app.use(express.static ('public'))

// set session to res
app.use((req,res,next)=>{
    if(req.session.userid){
        res.locals.session = req.session
    }
    next()
})





conn
    .sync({force:true})
    .then(() => {
        app.listen(5000)
    })
    .catch((err) => {
        console.log('deu erro' + err)
    })