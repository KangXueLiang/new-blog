import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const friendLinkSchema = new Schema({
    name: {
      type: String,
      required: true,
    },
    link: {
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
    collection: 'friendLink',
  },
);

const FriendLink = module.exports = mongoose.model('FriendLink', friendLinkSchema);
