import prisma from "../../prisma/prismaClient.js";
import _ from 'lodash'

export const getAllCards = async () =>{
     const cards = await prisma.creditCard.findMany({
        where: {deletedAt:null}
    });
    return cards; 
};

export const getCardById = async (id) =>{
    const card = await prisma.creditCard.findUniqueOrThrow({
        where:{id, deletedAt: null}
    });
    return card;  
};

export const createCard = async (card) =>{
    const {name, lastName, type, userDni} = card;
    const card_Create = await prisma.creditCard.create({
        data: {
        name: name.toLowerCase(),
        lastName: lastName.toLowerCase(),
        cardNumber: generateRandomNumber(16),
        code: generateRandomNumber(3),
        type: type.toLowerCase(),
        userDni
    }});
    return card_Create;
};

export const updateCard = async (id,card) =>{
        const {name, lastName, type} = card;
        const cardUpdate = await prisma.creditCard.update({
            where: {id}, 
            data:  {
                ...(name && {name: name.toLowerCase()}),
                ...(lastName &&  {lastName: lastName.toLowerCase()}),
                ...(type && {type})
            }
        });
        return cardUpdate;
};

export const deleteCard = async (id) =>{
    const cardDelete = await prisma.creditCard.update({
        where:{id},
        data: {deletedAt: new Date()}
    });
    return cardDelete;
};

export const generateRandomNumber = (amount) =>{
    const numbers = '0123456789';
    const result = [];
    for(let i = 0; i < amount; i++){
        result.push(numbers.split('')[_.random(0,numbers.length - 1)]);
    };
    return result.join('');
};