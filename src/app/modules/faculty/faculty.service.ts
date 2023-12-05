import { IFaculty } from './faculty.interface';
import { FacultyModel } from './faculty.model';

const createFaculty = async (payload: IFaculty) => {
  const result = await FacultyModel.create(payload);

  return result;
};

const getAllFaculty = async () => {
  const result = await FacultyModel.find();
  return result;
};

const getSingleFaculty = async (id: string) => {
  const result = await FacultyModel.findById(id);
  return result;
};

const updateFaculty = async (id: string, payload: IFaculty) => {
  const result = await FacultyModel.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

export const FacultyServices = {
  createFaculty,
  getAllFaculty,
  getSingleFaculty,
  updateFaculty,
};
