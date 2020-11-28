import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import PetController from './PetController';
import AnnouncementModel from '../Model/Announcement';

dotenv.config();

const privateJwtKey = process.env.PRIVATE_JWT_KEY || '';

const create = async (req: Request, res: Response) => {
  const token = req.headers.authorization?.split(' ')[1] || '';

  console.log(token);

  if (!token) {
    res.status(401).send('Usuário não autenticado.');
  }

  jwt.verify(token, privateJwtKey, function (err) {
    if (err) {
      res.status(401).send('Token não válido');
    }
  });

  const { pets, userId, announcement } = req.body;

  const createdPets = await Promise.all(pets.map(async (pet: any) => {
    const { id } = await PetController.create({
      ...pet,
      userId: userId
    });

    return id;
  }));

  const createdAnnouncement = await AnnouncementModel.create({
    userId,
    petIds: createdPets,
    ...announcement
  });

  res.status(200).send(createdAnnouncement);
};

export default {
  create
};
