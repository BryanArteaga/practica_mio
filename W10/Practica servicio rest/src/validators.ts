import Joi from 'joi';

export const tutorSchema = Joi.object({
  name: Joi.string().max(255).required(),
  identification: Joi.string().max(255).required(),
  expertise: Joi.string().max(255)
});

export const tutoreeSchema = Joi.object({
  name: Joi.string().max(255).required(),
  identification: Joi.string().max(255).required()
});

export const tutorialSchema = Joi.object({
  tutorId: Joi.number().required(),
  tutoradoId: Joi.number().required(),
  subject: Joi.string().max(255),
  hours: Joi.number(),
  date: Joi.date(),
  time: Joi.string().max(255)
});
