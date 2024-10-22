import { createCard, deleteCard, getAllCards, getCardById, updateCard } from "./card.service.js";

export const getAllCardsController = async (req,res) =>{
    try{
        const cards = await getAllCards();
        res.status(200).json(cards);
    }catch (error){
        res.status(500).json({ msg: 'Error al obtener las tarjetas' });
    };
};

export const getCardByIdController = async (req,res) =>{
    try{
        const id = parseInt(req.params.id);
        const card = await getCardById(id);
    if(!card){
        return res.status(404).json({ msg: 'No se encontro la tarjeta ingresada' });
    };
    res.status(200).json(card);
    }catch (error){
        res.status(500).json({error: 'Error al obtener la tarjeta'});
    };
};

export const createCardController = async (req,res) =>{
    try {
        const card = await createCard(req.body);
        res.status(201).json(card);
    } catch (error) {
        res.status(500).json({error: 'Error al crear tarjeta'});
    };
};

export const updateCardController = async (req,res) =>{
    try {
        const id = parseInt(req.params.id);
        const card = await updateCard(id,req.body);
        if(!card){
            return res.status(404).json({ msg: 'tarjeta no encontrada' });
        };
        res.json(card);
    } catch (error) {
        res.status(500).json({ msg: 'Error al actualizar la tarjeta' });
    };
};

export const deleteCardController = async (req,res) =>{
    try {
        const id = parseInt(req.params.id);
        const cardCheck = await deleteCard(id);

        if (!cardCheck) {
            return res.status(404).json({ msg: 'Tarjeta no encontrada' });
        };
		res.status(200).json({ msg: 'Tarjeta  eliminada con éxito' });
    }   catch (error) {
        res.status(204).json({error: 'Error al borrar el Tarjeta'});
    };
};