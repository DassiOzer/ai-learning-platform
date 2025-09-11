import { Router } from 'express';
import { 
    getUserByIdController, 
    getUserHistoryController, 
    updateUserController,
    deleteUserController,
    getAllUsersController
} from '../controllers/userController';

const router = Router();

// Get user by ID
router.get('/:id', getUserByIdController);

// Get user's learning history
router.get('/:id/history', getUserHistoryController);

// Update user details
router.put('/:id', updateUserController);

router.delete('/:id', deleteUserController);

router.get('/', getAllUsersController);

export default router;