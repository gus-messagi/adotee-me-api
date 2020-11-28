import { Request, Response } from 'express';
import PetController from './PetController';
import AnnouncementModel from '../Model/Announcement';

const create = async (req: Request, res: Response) => {
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
