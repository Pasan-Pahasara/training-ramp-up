import { DeleteResult, InsertResult, UpdateResult } from 'typeorm';
import { Student } from '../models/student.model';
import { dataSource } from '../configs/db.config';

const saveStudent = async (student: Student): Promise<InsertResult> => {
  try {
    // Insert the student into the database
    const newStudent: InsertResult = await dataSource.manager
      .getRepository(Student)
      .insert(student);
    return newStudent;
  } catch (error) {
    // Handle and rethrow the error
    throw error;
  }
};

const retrieveAllStudents = async (): Promise<Student[]> => {
  try {
    // Retrieve all the students from the database
    const students: Student[] = await dataSource.manager
      .getRepository(Student)
      .find();
    return students;
  } catch (error) {
    // Handle and rethrow the error
    throw error;
  }
};
// const retrieveAllStudents = async (): Promise<Array<Student>> => {
//   try {
//     const students: Array<Student> = await dataSource.manager
//       .getRepository(Student)
//       .find({ order: { studentId: 'DESC' } });
//     return students;
//   } catch (error) {
//     throw error;
//   }
// };

const updateStudent = async (
  id: string,
  student: Student,
): Promise<UpdateResult> => {
  try {
    // Update the student in the database
    const updatedStudent: UpdateResult = await dataSource.manager
      .getRepository(Student)
      .update(id, student);
    if (updatedStudent.affected === 1) {
      // If the student is updated
      updatedStudent.raw = student;
    } else {
      throw new Error('Student not found.');
    }
    return updatedStudent;
  } catch (error) {
    // Handle and rethrow the error
    throw error;
  }
};

const deleteStudent = async (id: string): Promise<DeleteResult> => {
  try {
    const deletedStudent: DeleteResult = await dataSource.manager
      .getRepository(Student)
      .delete(id);
    if (deletedStudent.affected !== 1) {
      throw new Error('Student not found.');
    }
    return deletedStudent;
  } catch (error) {
    // Handle and rethrow the error
    throw error;
  }
};

export { saveStudent, retrieveAllStudents, updateStudent, deleteStudent };
