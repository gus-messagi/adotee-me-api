import { Request, Response } from 'express';
import jwt, { decode, DecodeOptions } from 'jsonwebtoken';
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

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const UserFromMongoose = await UserModel.findOne({ email });

  if (!UserFromMongoose) {
    return res.send({
      statusCode: 400,
      message: 'E-mail e/ou senha inválido'
    });
  }

  const isCorrectPassword = await bcrypt.compare(password, UserFromMongoose.password);

  if (isCorrectPassword) {
    const jwtToken = await jwt.sign({ sub: UserFromMongoose._id }, privateJwtKey);

    res.send({
      user: UserFromMongoose,
      token: jwtToken
    });
  }

  res.send({
    statusCode: 400,
    message: 'Email e/ou senha inválida'
  });
};

const favorites = async (req: Request, res: Response) => {
  const token = req.headers.authorization?.split(' ')[1] || '';
  const { id } = req.params;

  if (!token) {
    res.status(401).send('Usuário não autenticado.');
  }

  jwt.verify(token, privateJwtKey, async function (err, decoded) {
    if (err) {
      res.status(401).send('Token não válido');
    }

    const jwtDecode = decoded as { sub: string };

    const user = await UserModel.findById(jwtDecode.sub);

    const hasFavorite = user?.favorites?.filter(favorite => favorite.toString() === id.toString());

    if (hasFavorite?.length === 0) {
      const updateUser = await UserModel.findByIdAndUpdate(
        {
          _id: user?._id
        }, {
          favorites: [
            ...user?.favorites,
            id
          ]
        },
        {
          new: true
        }
      );

      res.status(200).send(updateUser);
    } else {
      const favorites = user?.favorites?.filter(favorite => favorite.toString() !== id.toString());
      const updateUser = await UserModel.findByIdAndUpdate(
        {
          _id: user?._id
        }, {
          favorites
        },
        {
          new: true
        }
      );

      res.status(200).send(updateUser);
    }
  });
};

export default {
  create,
  login,
  favorites
};
