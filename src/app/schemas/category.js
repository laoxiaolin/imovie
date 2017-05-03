var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ObjectId = Schema.Types.ObjectId

var CategorySchema = new mongoose.Schema({
	name: String,
	desc: String,
	movies: [{type: ObjectId, ref: 'Movie'}],
	meta: {
		createAt: {
			type: Date,
			default: Date.now()
		},
		updateAt: {
			type: Date,
			default: Date.now()
		}
	}
})

CategorySchema.pre('save', function(next){
	if (this.isNew){
		this.meta.createAt = this.meta.updateAt = Date.now()
	}
	else{
		this.meta.updateAt = Date.now()
	}

	next()
})

CategorySchema.statics = {
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

module.exports = CategorySchema