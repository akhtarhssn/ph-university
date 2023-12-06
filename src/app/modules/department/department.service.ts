import { IDepartment } from './department.interface';
import { DepartmentModel } from './department.model';

const createDepartment = async (payload: IDepartment) => {
  const result = await DepartmentModel.create(payload);

  return result;
};

const getAllDepartments = async () => {
  const result = await DepartmentModel.find();

  return result;
};

const getSingleDepartment = async (id: string) => {
  const result = await DepartmentModel.findById(id);

  return result;
};

const updateDepartment = async (id: string, payload: IDepartment) => {
  const result = await DepartmentModel.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });

  return result;
};

export const DepartmentServices = {
  createDepartment,
  getAllDepartments,
  getSingleDepartment,
  updateDepartment,
};
