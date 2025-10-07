import { Router } from 'express';
import { TreinoController } from '../controllers/TreinoController';

const router = Router();

/**
 * @swagger
 * /api/treinos:
 *   get:
 *     summary: Retorna todos os treinos com informa??es do membro e plano
 *     tags: [Treinos]
 *     responses:
 *       200:
 *         description: Lista de treinos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Treino'
 */
router.get('/', TreinoController.getAll);

/**
 * @swagger
 * /api/treinos/{id}:
 *   get:
 *     summary: Retorna um treino pelo ID com informa??es do membro e plano
 *     tags: [Treinos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do treino
 *     responses:
 *       200:
 *         description: Treino encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Treino'
 *       404:
 *         description: Treino n?o encontrado
 */
router.get('/:id', TreinoController.getById);

/**
 * @swagger
 * /api/treinos:
 *   post:
 *     summary: Cria um novo treino
 *     tags: [Treinos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Treino'
 *     responses:
 *       201:
 *         description: Treino criado com sucesso
 *       400:
 *         description: Dados inv?lidos
 */
router.post('/', TreinoController.create);

/**
 * @swagger
 * /api/treinos/{id}:
 *   put:
 *     summary: Atualiza um treino existente
 *     tags: [Treinos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do treino
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Treino'
 *     responses:
 *       200:
 *         description: Treino atualizado com sucesso
 *       400:
 *         description: Dados inv?lidos
 *       404:
 *         description: Treino n?o encontrado
 */
router.put('/:id', TreinoController.update);

/**
 * @swagger
 * /api/treinos/{id}:
 *   delete:
 *     summary: Deleta um treino
 *     tags: [Treinos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do treino
 *     responses:
 *       204:
 *         description: Treino deletado com sucesso
 *       404:
 *         description: Treino n?o encontrado
 */
router.delete('/:id', TreinoController.delete);

export default router;
