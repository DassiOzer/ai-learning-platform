import express from 'express';
import { createPrompt, getUserPrompts } from '../controllers/promptController';

const router = express.Router();

router.post('/', createPrompt);
router.get('/user/:userId', getUserPrompts);

export default router;