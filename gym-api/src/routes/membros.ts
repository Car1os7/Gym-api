import { Router } from 'express';
import { MembroController } from '../controllers/MembroController';

const router = Router();

router.get('/', MembroController.getAll);
router.get('/:id', MembroController.getById);
router.post('/', MembroController.create);
router.put('/:id', MembroController.update);
router.delete('/:id', MembroController.delete);

export default router;