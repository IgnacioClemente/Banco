import prisma from "../../prisma/prismaClient.js";
import bcrypt from 'bcryptjs';
import { existUser } from "./user.controller.js";

export const getAllUsers = async () =>{
    const users = await prisma.user.findMany({
        select:{
            id: true,
            name: true,
            lastName: true,
            dni: true
        },
        where: {deletedAt:null}
    });
    return users;
};

export const getUserById = async (id) =>{
    const user = await prisma.user.findUniqueOrThrow({
        select:{
            id: true,
            name: true,
            password: true,
            dni: true,
            deletedAt: true,
            updatedAt: true,
            createAt: true
    },
        where:{id, deletedAt: null}
    });
    return user;     
};

export const createUser = async (user) =>{
    const {name, lastName, password, dni} = user;
    const passwordBcrypt = await bcrypt.hash(password, 10);
    const user_Create = await prisma.user.create({
        data: {
        name: name.toLowerCase(),
        lastName: lastName.toLowerCase(),
        password: passwordBcrypt,
        dni
    }});
    return user_Create;
};

export const updateUser = async (id,user) =>{
        const {name, lastName, password} = user;
        const passwordBcrypt = await bcrypt.hash(password, 10);
        const userUpdate = await prisma.user.update({
            where: {id}, 
            data:  {
                ...(name && {name: name.toLowerCase()}),
                ...(lastName &&  {lastName: lastName.toLowerCase()}),
                ...(password && {password: passwordBcrypt}),
            }
        });
        return userUpdate;
};

export const deleteUser = async (id) =>{
    const userExist = await existUser(id);
    const userDelete = await prisma.user.update({
        where:{id},
        data: {deletedAt: new Date()}
    });
    return userDelete;
};