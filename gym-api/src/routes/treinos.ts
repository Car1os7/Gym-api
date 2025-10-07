import { Router } from 'express';
import { TreinoController } from '../controllers/TreinoController';

const router = Router();

router.get('/', TreinoController.getAll);
router.get('/:id', TreinoController.getById);
router.post('/', TreinoController.create);
router.put('/:id', TreinoController.update);
router.delete('/:id', TreinoController.delete);

export default router;