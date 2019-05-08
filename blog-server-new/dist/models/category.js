'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Schema = _mongoose2.default.Schema;

const categorySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
}, {
  timestamps: {
    createdAt: 'publish_date',
    updatedAt: 'last_modified_date'
  }
}, {
  collection: 'category'
});

const Category = module.exports = _mongoose2.default.model('Category', categorySchema);