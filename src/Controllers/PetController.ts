import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import PetModel from '../Model/Pet';
import IPet from '../@types/Pet';

dotenv.config();

const privateJwtKey = process.env.PRIVATE_JWT_KEY || '';

const create = async (pet: IPet) => {
  if (!pet) {
    return {
      statusCode: 400,
      message: 'Faltando objeto pet'
    };
  }

  const petCreated = await PetModel.create(pet);

  return { id: petCreated._id };
};

const updateOneAdoption = async (req: Request, res: Response) => {
  const token = req.headers.authorization?.split(' ')[1] || '';

  if (!token) {
    res.status(401).send('Usuário não autenticado.');
  }

  jwt.verify(token, privateJwtKey, function (err) {
    if (err) {
      res.status(401).send('Token não válido');
    }
  });

  const { id } = req.params;

  const petUpdated = await PetModel.findOneAndUpdate({ _id: id }, { adopted: true }, { new: true });

  res.status(200).send(petUpdated);
};

export default {
  create,
  updateOneAdoption
};
