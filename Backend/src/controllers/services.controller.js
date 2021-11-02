const Service = require('../models/services.model')
const { create } = require('../models/token.model');

class ServiceController {


    // GET service
    getService(req, res, next) {
        Service.find({})
            .then((data) => res.send(data))
            .catch(next)
    }
    //POST /services/create
    create(req, res, next) {
        res.send('ok roi nha Binh')
    }
    //PUT /service/:id/edit
    update(req, res, next) {
        Service.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('back'))
            .catch(next)
    }

    // DELETE /service/:id
    delete(req, res, next) {
        Service.delete({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next)
    }


}
module.exports = new ServiceController();