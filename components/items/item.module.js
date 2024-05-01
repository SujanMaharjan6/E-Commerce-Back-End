const { Timestamp } = require('mongodb');
var mongoose = require('mongoose');
var schema = mongoose.Schema;


const ratingSchema = new schema({
    message: String,
    point: {
        type: Number,
        min : 1,
        max: 5
    },
    user: {
type: schema.Types.ObjectId,
ref: 'user'
    }
},{
    timestamps: true
})

const ItemSchema = new schema({
name: {
    type: String,
    required: true
},
description: String,
price: String,
quantity: Number,
warrentyPeriod: String,
warrentyStatus: Boolean,
color: String,
discount: {
    discountedItem: Boolean,
    discountType: {
        type: String,
        enum: ['percentage', 'quantity', 'value']
    },
    discountValue: String
},
size: String,
isReturnEligible: Boolean,
returnTimePeriod: String,
salesDate: Date,
modelNo: String,
images: [String],
vendor: {
    type: schema.Types.ObjectId,
    ref: 'user'
},
status: {
    type: String,
    enum:['available', 'out of stock', 'booked'],
    default: 'available'
},
ratings: [ratingSchema],
offers: [String],
tags: [String],
category: String,

},
{
    timestamps: true
}
)

const ItemModel = mongoose.model('item', ItemSchema);

module.exports = ItemModel;