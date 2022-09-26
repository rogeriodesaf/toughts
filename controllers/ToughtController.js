const Tought = require('../models/Tought')
const User = require('../models/User')

module.exports = class ToughtController {
    static showToughts(req, res) {
        res.render('toughts/home')
    }

    static   async dashboard(req, res) {
        const userId = req.session.userid

        const user = await User.findOne({
            where:{
                id: userId,
            },
            include :Tought,
            plain :true,
        })

        const tought = user.Toughts.map((result)=>result.dataValues)

        res.render('toughts/dashboard',{tought})
    }

    static createToughts(req,res){
        res.render('toughts/create')
    }

    static async createToughtsPost(req, res) {
        const tought = {
            title: req.body.title,
            UserId: req.session.userid,
        }
        try {
            await Tought.create(tought)
            req.flash('message', 'Pensamento inserido com sucesso!')
            req.session.save(() => {
                res.redirect('/toughts/dashboard')
            })
        } catch (error) {
            console.log(error)
        }

    }
}
