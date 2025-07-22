import Joi from "joi";
import { isValidObjectId } from 'mongoose';

export const createPostSchema = Joi.object({
   title: Joi.string().min(50).max(150).required().messages({
        'string.base': 'Title should be a string', 
        'string.min': 'Title should have at least {#limit} characters',
        'string.max': 'Title should have at most {#limit} characters',
        'any.required': 'Title is required',
      }),
    longTitle: Joi.string().min(20).max(150).required(),
    slug: Joi.string().min(10).max(75).required(),
    desc: Joi.string().min(20).max(250).required(),
    longDesc: Joi.string().required(),
    author: Joi.string().min(5).max(50).required(),
    date: Joi.date().required(),
    color: Joi.string().valid('orange', 'green', 'red', 'purple', 'blue', 'light_blue').required(),
    category: Joi.string().valid('астрология', 'таро', 'психоанализ').required(),
    keyWordImgSrcPostTop: Joi.string().min(5).max(50).required(),

});

