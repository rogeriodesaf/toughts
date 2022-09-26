const Tought = require('../models/Tought')
const User = require('../models/User')

module.exports = class ToughtController {
    static async showToughts(req, res) {
        const tought = await Tought.findAll({
            include:User,
        })
        const toughts = tought.map((result) => result.get({plain:true}))
        res.render('toughts/home',{toughts})
        console.log(toughts)
    }

    static async dashboard(req, res) {
        const userId = req.session.userid

        const user = await User.findOne({
            where: {
                id: userId,
            },
            include: Tought,
            plain: true,
        })

       
        const tought = user.Toughts.map((result) => result.dataValues)
        let emptyToughts = false
        if(tought.length === 0){
            emptyToughts = true
        }

        res.render('toughts/dashboard', { tought,emptyToughts })
    }

    static createToughts(req, res) {
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
    static async removeTought(req, res) {
        const id = req.body.id
        const userId = req.session.userid

        try {
            await Tought.destroy({ where: { id: id, userId: userId } })
            req.flash('message', 'Pensamento removido com sucesso')
            req.session.save(() => {
                res.redirect('/toughts/dashboard')
            })
        } catch (error) {
            console.log(error)
        }
    }
    static async updateToughts(req,res){
        const id = req.params.id

        const tought = await Tought.findOne({where:{id:id},raw:true })
        res.render('toughts/edit',{tought})
    }
    static async updateToughtSave(req,res){
        const id = req.body.id
        const tought ={
            title : req.body.title,
        }
        
        try {
            await Tought.update(tought,{where:{id:id},raw:true})
            req.flash('message','pensamento atualizado com sucesso!')
            req.session.save(()=>{
                res.redirect('/toughts/dashboard')
            })
        
        } catch (error) {

            console.log(error)
        }
    }
}
