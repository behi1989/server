const Schema = require('mongoose').Schema;
const addressSchema = require('./address.schema');

let schema_obj = {
  first_name: {
    type: String,
    required: true,
    trim: true,
  },
  surname: {
    type: String,
    required: true,
    trim: true,
  },
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  secret: {
    type: String,
    // required: true
  },
  mobile_no: {
    type: String,
  },
  dob: Date,
  loyalty_points: {
    type: Number,
    default: 0
  },
  gender: {
    type: String,
    enum: ['m', 'f'],
    required: true,
  },
  preferred_brands: [{type: Schema.Types.ObjectId, ref: 'Brand'}],
  wish_list: [Schema.Types.ObjectId],
  preferred_tags: [{type: Schema.Types.ObjectId, ref: 'Tag'}],
  orders: [{type: Schema.Types.ObjectId, ref: 'Order'}],
  addresses:[addressSchema],
};

let customerSchema = new Schema(schema_obj, {strict: true});

module.exports = customerSchema;
