import { model, Schema } from 'mongoose';

const postSchema = new Schema(
  {
    imgSrc: {
      type: String,
      required: true,
    },
    imgSrcPostTop: {
      type: String,
      required: true,
    },
     keyWordImgSrcPostTop: {
      type: String,
      required: true,
        },
    title: {
      type: String,
      required: true,
        },
    longTitle: {
      type: String,
      required: true,
        },
    slug: {
      type: String,
      required: true,
        },
    desc: {
      type: String,
      required: true,
        },
    longDesc: {
      type: String,
      required: false,
        },
    author: {
      type: String,
      required: true,
        },
    date: {
      type: Date,
      required: true,
        },
    category: {
      type: String,
      required: true,
      enum: ['астрология', 'таро', 'психоанализ'],
      default: 'астрология'
        },
     color: {
      type: String,
      required: true,
      enum: ['orange', 'green', 'red', 'purple', 'blue', 'light_blue'],
      default: 'light_blue'
    },  
     views: {
    type: Number,
    default: 0,
  },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);




export const PostCollection = model('posts', postSchema);
