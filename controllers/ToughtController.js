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

    static async createToughtsPost(req,res){
       const tought = {
            title: req.body.title,
            UserId : req.session.userid,
    }
    try {
        await Tought.create(tought)
    req.flash('message','Pensamento inserido com sucesso!')
    req.session.save(()=>{
        res.redirect('/toughts/dashboard')
    })
    } catch (error) {
        console.log(error)
    }
    
   

}
}
