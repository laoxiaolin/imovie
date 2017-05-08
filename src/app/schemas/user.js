var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ObjectId = Schema.Types.ObjectId

var bcrypt = require('bcrypt')
var SALT_WORK_FACTOR = 10

var UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    phoneNumber: Number,
    availableBalance: {type: Number, default: 0},
    totalRecharge: {type: Number, default: 0},
    vipStatus: {type: Number, default: 0},
    vip: {
        //0
        //1: 包1天
        //7: 包7天
        //30: 包30天
        Level: {type: Number, default: 0},
        createAt: {
            type: Date,
            default: Date.now()
        }
    },
    orders: [{type: ObjectId, ref: 'RechargeOrder'}],
    // 0:nomal user
    // 1:verfied user(邮件激活后的用户)
    // 2:professonal user
    // ..
    // >10: admin
    // >50: super admin   
    role: {
        type: Number,
        default: 0
    },
    loginTotal: {
        type: Number,
        default: 0
    },
    login: {
        lastIp: String,
        lastTime: {
            type: Date,
            default: Date.now()
        }
    },
    reg: {
        regIp: String,
        createAt: {
            type: Date,
            default: Date.now()
        }
    }
})

UserSchema.pre('save', function(next) {
    var user = this

    if (this.isNew) {
        this.reg.createAt = this.login.lastTime = Date.now()
        // this.reg.regIp    = req.ip
    }


    bcrypt.hash(user.password, SALT_WORK_FACTOR, function(err, hash) {
        if (err) return next(err)

        user.password = hash
        next()
    })

})

UserSchema.methods = {
    comparePassword: function(_password, cb){
        bcrypt.compare(_password, this.password, function(err,isMatch){
            if (err) return cb(err)

            cb(null, isMatch)
        })
    }
}


UserSchema.statics = {
    fetch: function(cb) {
        return this
            .find({})
            .sort('meta.updateAt')
            .exec(cb)
    },

    findById: function(id, cb) {
        var id = mongoose.Types.ObjectId(id)
        return this
            .findOne({'_id': id})
            .exec(cb)
    }
}

module.exports = UserSchema
