import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    }
  },
  {
    timestamps:
      {
        createdAt: 'publish_date',
        updatedAt: 'last_modified_date'
      }
  },
  {
    collection: 'category',
  },
);

const Category = module.exports = mongoose.model('Category', categorySchema);
