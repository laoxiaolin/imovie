var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ObjectId = Schema.Types.ObjectId

var RechargeSchema = new mongoose.Schema({
  status: {type: Number, default: 0},
  createAt: {
    type: Date,
    default: Date.now()
  },
  transactionType: {type: Number, default: 0},  
  totalRecharge: {type: Number, default: 0},
  user: [{type: ObjectId, ref: 'User'}],
  payChannel: {type: Number, default: 0},
  payTime: {
    type: Date,
    default: Date.now()
  }
})





RechargeSchema.pre('save', function(next){
  if (this.isNew){
    this.createAt = this.payTime = Date.now()
  }

  next()
})

RechargeSchema.statics = {
  fetch: function(cb){
    return this
    .find({})
    .sort('meta.updateAt')
    .exec(cb)
  },

  findById: function(id, cb){
    var id = mongoose.Types.ObjectId(id)
    return this
    .findOne({'_id': id})
    .exec(cb)
  }
}

module.exports = RechargeSchema