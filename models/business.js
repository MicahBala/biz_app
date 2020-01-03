const Joi = require('joi');
const mongoose = require('../db_connect');

// Business Schema
const bizSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 5, maxlength: 100 },
  address: { type: String, required: true, minlength: 5, maxlength: 100 },
  phone: { type: String, required: true, minlength: 5, maxlength: 20 },
  addedOn: { type: Date, default: Date.now }
});

// Business Model
const Biz = mongoose.model('Biz', bizSchema);

// Validation
function validateBiz(business) {
  const schema = {
    name: Joi.string()
      .min(5)
      .required(),
    address: Joi.string()
      .min(5)
      .required(),
    phone: Joi.string()
      .min(5)
      .required(),
    addedOn: Joi.date()
  };

  return Joi.validate(business, schema);
}

module.exports.Business = Biz;
module.exports.validate = validateBiz;
