import { Router } from 'express';
import { PlanoController } from '../controllers/PlanoController';

const router = Router();

/**
 * @swagger
 * /api/planos:
 *   get:
 *     summary: Retorna todos os planos
 *     tags: [Planos]
 *     responses:
 *       200:
 *         description: Lista de planos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Plano'
 */
router.get('/', PlanoController.getAll);

/**
 * @swagger
 * /api/planos/{id}:
 *   get:
 *     summary: Retorna um plano pelo ID
 *     tags: [Planos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do plano
 *     responses:
 *       200:
 *         description: Plano encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Plano'
 *       404:
 *         description: Plano n?o encontrado
 */
router.get('/:id', PlanoController.getById);

/**
 * @swagger
 * /api/planos:
 *   post:
 *     summary: Cria um novo plano
 *     tags: [Planos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Plano'
 *     responses:
 *       201:
 *         description: Plano criado com sucesso
 *       400:
 *         description: Dados inv?lidos
 */
router.post('/', PlanoController.create);

/**
 * @swagger
 * /api/planos/{id}:
 *   put:
 *     summary: Atualiza um plano existente
 *     tags: [Planos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do plano
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Plano'
 *     responses:
 *       200:
 *         description: Plano atualizado com sucesso
 *       400:
 *         description: Dados inv?lidos
 *       404:
 *         description: Plano n?o encontrado
 */
router.put('/:id', PlanoController.update);

/**
 * @swagger
 * /api/planos/{id}:
 *   delete:
 *     summary: Deleta um plano
 *     tags: [Planos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do plano
 *     responses:
 *       204:
 *         description: Plano deletado com sucesso
 *       404:
 *         description: Plano n?o encontrado
 */
router.delete('/:id', PlanoController.delete);

export default router;
