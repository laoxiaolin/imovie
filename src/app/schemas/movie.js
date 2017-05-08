var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ObjectId = Schema.Types.ObjectId

var MovieSchema = new Schema({
	doctor: String,
	title: String,
	language: String,
	country: String,
	summary: String,
	flash: String,
	poster: String,
	year: Number,
	pv: {type: Number, default: 0},
	price: {type: Number, default: 5},
	category: {type: ObjectId, ref: 'Category'},
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



MovieSchema.pre('save', function(next){
	if (this.isNew){
		this.meta.createAt = this.meta.updateAt = Date.now()
	}
	else{
		this.meta.updateAt = Date.now()
	}

	next()
})




MovieSchema.statics = {
	fetch: function(cb){
		return this
		.find({})
		.populate('category')
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

module.exports = MovieSchema