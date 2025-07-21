import Joi from "joi";
import { isValidObjectId } from 'mongoose';

export const createContactSchema = Joi.object({
    name: Joi.string().min(3).max(20).required().messages({
        'string.base': 'Username should be a string', // Кастомізація повідомлення для типу "string"
        'string.min': 'Username should have at least {#limit} characters',
        'string.max': 'Username should have at most {#limit} characters',
        'any.required': 'Username is required',
      }),
  phoneNumber: Joi.string().min(3).max(20).required(),
  email: Joi.string().min(3).max(20), 
  isFavourite: Joi.boolean(),
  contactType: Joi.string().valid('work', 'home', 'personal').required(),
  userId: Joi.string().custom((value, helper) => {
    if (value && !isValidObjectId(value)) {
      return helper.message('Not valid objectId');
    }
    return true;
 }),

});

export const updateContactSchema = Joi.object({
  name: Joi.string().min(3).max(20).required().messages({
    'string.base': 'Username should be a string', // Кастомізація повідомлення для типу "string"
    'string.min': 'Username should have at least {#limit} characters',
    'string.max': 'Username should have at most {#limit} characters',
    'any.required': 'Username is required',
  }),
phoneNumber: Joi.string().min(3).max(20),
email: Joi.string().min(3).max(20), 
isFavourite: Joi.boolean(),
contactType: Joi.string().valid('work', 'home', 'personal'),
});