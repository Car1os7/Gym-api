import { Router } from 'express';
import { MembroController } from '../controllers/MembroController';

const router = Router();

/**
 * @swagger
 * /api/membros:
 *   get:
 *     summary: Retorna todos os membros com seus planos e treinos
 *     tags: [Membros]
 *     responses:
 *       200:
 *         description: Lista de membros
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Membro'
 */
router.get('/', MembroController.getAll);

/**
 * @swagger
 * /api/membros/{id}:
 *   get:
 *     summary: Retorna um membro pelo ID com plano e treinos
 *     tags: [Membros]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do membro
 *     responses:
 *       200:
 *         description: Membro encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Membro'
 *       404:
 *         description: Membro n?o encontrado
 */
router.get('/:id', MembroController.getById);

/**
 * @swagger
 * /api/membros:
 *   post:
 *     summary: Cria um novo membro
 *     tags: [Membros]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Membro'
 *     responses:
 *       201:
 *         description: Membro criado com sucesso
 *       400:
 *         description: Dados inv?lidos
 */
router.post('/', MembroController.create);

/**
 * @swagger
 * /api/membros/{id}:
 *   put:
 *     summary: Atualiza um membro existente
 *     tags: [Membros]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do membro
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Membro'
 *     responses:
 *       200:
 *         description: Membro atualizado com sucesso
 *       400:
 *         description: Dados inv?lidos
 *       404:
 *         description: Membro n?o encontrado
 */
router.put('/:id', MembroController.update);

/**
 * @swagger
 * /api/membros/{id}:
 *   delete:
 *     summary: Deleta um membro
 *     tags: [Membros]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do membro
 *     responses:
 *       204:
 *         description: Membro deletado com sucesso
 *       404:
 *         description: Membro n?o encontrado
 */
router.delete('/:id', MembroController.delete);

export default router;
