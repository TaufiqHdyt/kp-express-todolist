import * as TaskRepo from '../repository/tasks.js';
import { successResponse, errorResponse } from '../utils/response.js';

export const getAllTask = async (request, response, next) => {
  try {
    const [result] = await TaskRepo.getData();
    successResponse(response, 'Ok', result);
  } catch (error) {
    next(error);
  }
};

export const createTask = async (request, response, next) => {
  try {
    let user = request.body.user;
    let name = request.body.name;
    const [result] = await TaskRepo.createData(name, user);
    successResponse(response, 'berhasil menambahkan data', result.insertId);
  } catch (error) {
    next(error);
  }
};

export const getTaskById = async (request, response, next) => {
  try {
    let id = request.params.id;
    const [result] = await TaskRepo.getDataById(id);
    if (result.length > 0) {
      successResponse(response, 'Ok', result[0]);
    } else {
      errorResponse(response, 'data tidak ditemukan', 404);
    }
  } catch (error) {
    next(error);
  }
};

export const updateTask = async (request, response, next) => {
  try {
    let id = request.body.id;
    let name = request.body.name;
    let completed = request.body.completed;
    const [result] = await TaskRepo.updateData(name, completed, id);
    successResponse(response, 'berhasil mengupdate data', result.info);
  } catch (error) {
    next(error);
  }
};

export const deleteTaskById = async (request, response, next) => {
  try {
    let id = request.params.id;
    const [result] = await TaskRepo.deleteData(id);
    successResponse(response, 'Ok', result[0]);
  } catch (error) {
    next(error);
  }
};