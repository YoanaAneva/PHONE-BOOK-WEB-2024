import express from 'express';
import { dbMethods } from '../model/usersSchema/dbMethods';
import { random, authentication } from '../helpers';

export const login = async (req: express.Request, res: express.Response) => {
    try {
        const { username, password} = req.body;
        
        if(!username || !password) {
            return res.sendStatus(400).json({ status: 'Invalid password or username' });
        }
        
        const user = await dbMethods.getUserByUsername(username);
    
        if(!user) {
            return res.sendStatus(400).json({ status: 'User not found' });
        }

        const expectedHash = authentication(user.authentication.salt, password);
        if(user.authentication.password != expectedHash) {
            return res.sendStatus(403).json({ status: 'Incorrect password' });
        }

        return res.sendStatus(200).json(user).end();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const register = async (req: express.Request, res: express.Response) => {
    try {
        const { password, username } = req.body;

        if(!password || !username) {
            return res.sendStatus(400).json({ status: 'Invalid password or username' });
        }

        const existingUser = await dbMethods.getUserByUsername(username);

        if(existingUser) {
            return res.sendStatus(400).json({ status: 'User already exists' });
        }

        const salt = random();
        const user = await dbMethods.createUser({
            username,
            authentication: {
                password: authentication(salt, password),
                salt,
            },
        });

        return res.sendStatus(200).json(user).end();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}


