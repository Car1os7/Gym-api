import { Router } from 'express';
import { PlanoController } from '../controllers/PlanoController';

const router = Router();

router.get('/', PlanoController.getAll);
router.get('/:id', PlanoController.getById);
router.post('/', PlanoController.create);
router.put('/:id', PlanoController.update);
router.delete('/:id', PlanoController.delete);

export default router;