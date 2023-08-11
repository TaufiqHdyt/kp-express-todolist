import * as UserRepo from '../repository/users.js';
import { successResponse, errorResponse } from '../utils/response.js';

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const secret_at = 'kelas.com';
const secret_rt = 'taufiq';

export const getAllUser = async (request, response, next) => {
  try {
    const [result] = await UserRepo.getData();
    successResponse(response, 'Ok', result);
  } catch (error) {
    next(error);
  }
};

export const createUser = async (request, response, next) => {
  try {
    let name = request.body.name;
    let email = request.body.email;
    let password = request.body.password;
    const saltRound = 10;
    const hashed = await bcrypt.hash(password, saltRound);
    const [result] = await UserRepo.createData(name, email, hashed);
    successResponse(response, 'berhasil menambahkan data', result.insertId);
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (request, response, next) => {
  try {
    let id = request.params.id;
    const [result] = await UserRepo.getDataById(id);
    if (result.length > 0) {
      successResponse(response, 'Ok', result[0]);
    } else {
      errorResponse(response, 'data tidak ditemukan', 404);
    }
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (request, response, next) => {
  try {
    let id = request.body.id;
    let name = request.body.name;
    let email = request.body.email;
    const [result] = await UserRepo.updateData(name, email, id);
    successResponse(response, 'berhasil mengupdate data', result.info);
  } catch (error) {
    next(error);
  }
};

export const deleteUserById = async (request, response, next) => {
  try {
    let id = request.params.id;
    const [result] = await UserRepo.deleteData(id);
    successResponse(response, 'Ok', result[0]);
  } catch (error) {
    next(error);
  }
};

export const authUser = async (request, response, next) => {
  try {
    let email = request.body.email;
    let password = request.body.password;
    const [[{ password: userPass, ...user }]] = await UserRepo.getDataByEmail(email);

    if (!!user) {
      if (!!bcrypt.compareSync(password, userPass)) {
        const claims = user;
        const accessToken = jwt.sign(claims, secret_at, { expiresIn: '15m' });
        const refreshToken = jwt.sign(claims, secret_rt, { expiresIn: '30m' });
        const respData = {
          ...claims,
          accessToken,
          refreshToken,
        };
        successResponse(response, 'ok', respData);
      } else {
        errorResponse(response, 'email / password salah', 401);
      }
    } else {
      errorResponse(response, 'user tidak ditemukan', 404);
    }
  } catch (error) {
    next(error);
  }
};
