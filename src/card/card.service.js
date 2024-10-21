import prisma from "../../prisma/prismaClient.js";

// cardNumber  BigInt @unique
// code        Int

//random

//A) random de string con condicion de numeros max 16 y el resultado lo pongo en BigInt()
//B) 2 randoms de int de 8 los junto en Bigint() concatenar

// numero: BigInt(numero)
// const result = {... author_Create, number: number.toString()};
// return result;

export const getAllCards = async () => {
     const cards = await prisma.creditCard.findMany({
        select:{
            id: true,
            name: true,
            lastName: true,
            code: true,
            type: true,
            userDni: true
        },
        where: {deletedAt:null}
    });
    return cards; 
}

export const getCardById = async (id) => {
    const card = await prisma.creditCard.findUniqueOrThrow({
        select:{
            id: true,
            name: true,
            lastName: true,
            code: true,
            type: true,
            userDni: true,
            deletedAt: true,
            updatedAt: true,
            createAt: true
    },
        where:{id, deletedAt: null}
    });
    return card;  
}

export const createCard = async (card) => {
    const {name, lastName, cardNumber, code, type, userDni} = card;
    var number = Math.floor(Math.random() * (9999999999999999 -1000000000000000 + 1)) + 1000000000000000;
    var codigo = Math.floor(Math.random() * (999 - 100 + 1)) + 100;
    const card_Create = await prisma.creditCard.create({
        data: {
        name: name.toLowerCase(),
        lastName: lastName.toLowerCase(),
        cardNumber: BigInt(number),
        code: codigo,
        type: type.toLowerCase(),
        userDni
    }});
    const result = {... card_Create, number: number.toString()};
    return result
}

export const updateCard = async (id,card) => {
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
}

export const deleteCard = async (id) =>{
    const cardDelete = await prisma.creditCard.update({
        where:{id},
        data: {deletedAt: new Date()}
    });
    return cardDelete;
}