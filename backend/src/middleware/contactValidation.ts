const Joi = require('joi');
import { Request, Response, NextFunction } from 'express';
import { ContactModel } from '../model/contactsSchema'

export const validateContact = (req: Request, res: Response, next: NextFunction): void | Response => {
    addDefaultNumberType(req.body);
    const phoneNumberSchema = Joi.object({
        number: Joi.string().required(),
        type: Joi.string().valid('MOBILE', 'HOME', 'WORK')
    });

    const metadataSchema = Joi.object({
        email: Joi.string().email(),
        address: Joi.string(),
        website: Joi.string(),
        birthdate: Joi.string().isoDate(),
        notes: Joi.string()
    });

    const contactSchema = Joi.object({
        name: Joi.string().required(),
        surname: Joi.string(),
        picture: Joi.string(),
        phoneNumbers: Joi.array().items(phoneNumberSchema).required(),
        metadata: metadataSchema.optional(),
        user_username: Joi.string().required()
    });
    
    const { error } = contactSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error : error.details[0].message});
    }
    next();
}

export const validatePatchRequest = (req: Request, res: Response, next: NextFunction) => {
    const schemaFields = Object.keys(ContactModel.schema.paths);
    const requestBodyKeys = Object.keys(req.body);

    const invalidFields = requestBodyKeys.filter(key => !schemaFields.includes(key));

    if (invalidFields.length > 0) {
        return res.status(400).json({ error: `Invalid fields: ${invalidFields.join(', ')}` });
    }
    next(); 
}

function addDefaultNumberType(reqBody:  Record<string, any>) {
    for (const phoneNumber of reqBody.phoneNumbers) {
        if (!phoneNumber.type) {
            phoneNumber.type = 'MOBILE';
        }
    }
}