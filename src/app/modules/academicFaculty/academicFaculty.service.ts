import { IAcademicFaculty } from './academicFaculty.interface';
import { AcademicFacultyModel } from './academicFaculty.model';

const createAcademicFaculty = async (payload: IAcademicFaculty) => {
  const result = await AcademicFacultyModel.create(payload);

  return result;
};

const getAllAcademicFaculty = async () => {
  const result = await AcademicFacultyModel.find();
  return result;
};

const getSingleAcademicFaculty = async (id: string) => {
  const result = await AcademicFacultyModel.findById(id);
  return result;
};

const updateAcademicFaculty = async (id: string, payload: IAcademicFaculty) => {
  const result = await AcademicFacultyModel.findOneAndUpdate(
    { _id: id },
    payload,
    {
      new: true,
    },
  );
  return result;
};

export const AcademicFacultyServices = {
  createAcademicFaculty,
  getAllAcademicFaculty,
  getSingleAcademicFaculty,
  updateAcademicFaculty,
};
