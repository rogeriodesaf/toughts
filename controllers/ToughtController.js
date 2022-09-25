const Tought = require('../models/Tought')
const User   = require('../models/User')

module.exports = class ToughtController{
    static showToughts(req,res){
        res.render('toughts/home')
    }

    static dashboard(req,res){
        res.render('toughts/dashboard')
    }

    static createToughts(req,res){
        res.render('toughts/create')
    }

    static postToughts(req,res){
       const {title} = req.body
       console.log(title)

    }
}
