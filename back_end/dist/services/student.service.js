"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateStudent = exports.retrieveAllStudents = exports.saveStudent = void 0;
const student_model_1 = require("../models/student.model");
const db_config_1 = require("../configs/db.config");
const saveStudent = (student) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Insert the student into the database
        const newStudent = yield db_config_1.dataSource.manager
            .getRepository(student_model_1.Student)
            .insert(student);
        return newStudent;
    }
    catch (error) {
        // Handle and rethrow the error
        throw error;
    }
});
exports.saveStudent = saveStudent;
const retrieveAllStudents = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Retrieve all the students from the database
        const students = yield db_config_1.dataSource.manager
            .getRepository(student_model_1.Student)
            .find();
        return students;
    }
    catch (error) {
        // Handle and rethrow the error
        throw error;
    }
});
exports.retrieveAllStudents = retrieveAllStudents;
const updateStudent = (id, student) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Update the student in the database
        const updatedStudent = yield db_config_1.dataSource.manager
            .getRepository(student_model_1.Student)
            .update(id, student);
        // if (updatedStudent.affected === 1) {
        //   // If the student is updated
        //   updatedStudent.raw = student;
        // } else {
        //   throw new Error('Student not found.');
        // }
        return updatedStudent;
    }
    catch (error) {
        // Handle and rethrow the error
        throw error;
    }
});
exports.updateStudent = updateStudent;
