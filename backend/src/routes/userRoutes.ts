import { Router } from 'express';
import { 
    getUserByIdController, 
    getUserHistoryController, 
    updateUserController,
    deleteUserController,
    getAllUsersController
} from '../controllers/userController';

const router = Router();

router.get('/:id', getUserByIdController);
router.get('/:id/history', getUserHistoryController);
router.put('/:id', updateUserController);
router.delete('/:id', deleteUserController);
router.get('/', getAllUsersController);

export default router;