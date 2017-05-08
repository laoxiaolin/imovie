var mongoose = require('mongoose')
var RechargeSchema = require('../schemas/recharge')
var Recharge = mongoose.model('Recharge', RechargeSchema)

module.exports = Recharge