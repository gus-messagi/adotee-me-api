import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import UserModel from '../Model/User';

dotenv.config();

const privateJwtKey = process.env.PRIVATE_JWT_KEY || '';

const create = async (req: Request, res: Response) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const UserCreated = await UserModel.create({
      ...req.body,
      password: hashedPassword
    });

    const jwtToken = await jwt.sign({ sub: UserCreated._id }, privateJwtKey);

    res.send({
      user: UserCreated,
      token: jwtToken
    });
  } catch (err) {
    console.log(err);
  };
};

export default {
  create
};
