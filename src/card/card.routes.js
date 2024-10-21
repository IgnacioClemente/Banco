import express from 'express';
import { createCardController, deleteCardController, getAllCardsController, getCardByIdController, updateCardController } from './card.controller.js';

const router = express.Router();

router.get('/card', getAllCardsController);
router.get('/card/:id', getCardByIdController);
router.post('/card', createCardController);
router.patch('/card/:id', updateCardController);
router.delete('/card/:id', deleteCardController);

export default router;