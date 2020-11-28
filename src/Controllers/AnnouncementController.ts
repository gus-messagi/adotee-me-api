import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import PetController from './PetController';
import AnnouncementModel from '../Model/Announcement';

dotenv.config();

const privateJwtKey = process.env.PRIVATE_JWT_KEY || '';

const index = async (_: any, res: Response) => {
  const announcements = await AnnouncementModel.aggregate([
    {
      $lookup: {
        from: 'users',
        let: {
          id: '$userId'
        },
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: [
                  '$_id',
                  '$$id'
                ]
              }
            }
          },
          {
            $project: {
              _id: 1,
              name: 1,
              email: 1,
              contact: 1
            }
          }
        ],
        as: 'user'
      }
    },
    {
      $lookup: {
        from: 'pets',
        localField: 'petIds',
        foreignField: '_id',
        as: 'pets'
      }
    },
    {
      $project: {
        _id: 1,
        title: 1,
        description: 1,
        state: 1,
        city: 1,
        user: 1,
        jointAdoption: 1,
        pets: {
          _id: 1,
          health: 1,
          temperament: 1,
          name: 1,
          breed: 1,
          sex: 1,
          age: 1,
          size: 1,
          type: 1,
          hasSpecialNeeds: 1,
          adopted: 1
        }
      }
    }
  ]);

  res.status(200).send(announcements);
};

const create = async (req: Request, res: Response) => {
  const token = req.headers.authorization?.split(' ')[1] || '';

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
  index,
  create
};
