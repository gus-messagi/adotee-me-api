import PetModel from '../Model/Pet';
import IPet from '../@types/Pet';

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

export default {
  create
};
