const mongoose = require('mongoose');

import { Request, Response} from 'express'

import { dbMethods } from '../model/contactsSchema'

export const getAllContacts = async (req: Request, res: Response) => {
    try{
        const contacts = await dbMethods.getAllContacts();
        return res.send(contacts);
    } catch (error) {
        handleErrors(res, error);
    }
};

export const getContactByIdr = async (req: Request, res: Response) => {
    try{
        const contact = await dbMethods.getContactById(req.params.id);
        if(!contact) {
            return res.status(404).json({ error: `No contact found with id: ${req.params.id}` });
        }
        return res.send(contact);
    } catch (error) {
        handleErrors(res, error);
    }
};

export const getAllNumbersForContact = async (req: Request, res: Response) => {
    try {
        const phoneNumbers = await dbMethods.getAllNumbersForContact(req.params.id);
        if(phoneNumbers.lenght === 0) {
            return res.status(404).json({ error: `No contact found with id: ${req.params.id}` });
        }
        return res.send(phoneNumbers);
    } catch (error) {
        handleErrors(res, error);
    }
};

// // will be moved to userController
export const getContactsByUser = async (req: Request, res: Response) => {
    try {
        const contacts = await dbMethods.getContactsByUser(req.params.username);
        return res.send(contacts);
    } catch (error) {
        handleErrors(res, error);
    }
};

export const addContact = async (req: Request, res: Response) => {
    try {
        const contact = await dbMethods.addContact(req.body);
        return res.status(201).json(contact);
    } catch (error) {
        handleErrors(res, error);
    }
};

export const updateContactById = async (req: Request, res: Response) => {
    try {
        let contact = await dbMethods.updateContactById(req.params.id, req.body);
        if(!contact) {
            contact = await dbMethods.addContact(req.body);
            res.status(201);
        }
        return res.send(contact);
    } catch (error) {
        handleErrors(res, error);
    }
};

export const partiallyUpdateContactById = async (req: Request, res: Response) => {
    try {
        const contact = await dbMethods.updateContactById(req.params.id, req.body);
        if(!contact) {
            return res.status(404).json({ error: `No contact found with id: ${req.params.id}` })
        }
        return res.send(contact);
    } catch (error) {
        handleErrors(res, error);
    }
};

export const deleteContactById = async (req: Request, res: Response) => {
    try {
        const contact = await dbMethods.deleteContactById(req.params.id);
        if (!contact) {
            return res.status(404).json({ error: `No contact found with id: ${req.params.id}` });
        }
        return res.status(204).send();
    } catch (error) {
        handleErrors(res, error);
    }
};

export const deleteContactsByUser = async (req: Request, res: Response) => {
    try { 
        const result = await dbMethods.deleteContactsByUser(req.params.username);
        console.log(result.deletedCount);
        if (result.deletedCount === 0) {
            return res.status(404).json({ error: `No contacts found with username: ${req.params.username}` });
        }
        return res.status(204).send();
    } catch (error) {
        handleErrors(res, error);
    }
}

function handleErrors(res: Response, error) {
    if(error instanceof mongoose.Error.CastError) {
        return res.status(400).json({ error: 'Invalid id format' });
    }
    console.log(error);
    return res.status(500).json({ error: 'Internal Server Error' });
}