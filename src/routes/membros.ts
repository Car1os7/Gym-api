import { Router } from 'express';
import { MembroController } from '../controllers/MembroController';

const router = Router();

/**
 * @swagger
 * /api/membros/stats:
 *   get:
 *     summary: Retorna estatísticas do sistema
 *     tags: [Membros]
 *     responses:
 *       200:
 *         description: Estatísticas do sistema
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalMembros:
 *                   type: integer
 *                 totalPlanos:
 *                   type: integer
 *                 totalTreinos:
 *                   type: integer
 *                 membroMaisAtivo:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     nome:
 *                       type: string
 *                     totalTreinos:
 *                       type: integer
 *                     plano:
 *                       type: string
 */
router.get('/stats', MembroController.getStats);

/**
 * @swagger
 * /api/membros/search:
 *   get:
 *     summary: Busca membros com filtros avançados
 *     tags: [Membros]
 *     parameters:
 *       - in: query
 *         name: nome
 *         schema:
 *           type: string
 *         description: Buscar por nome (parcial)
 *       - in: query
 *         name: email
 *         schema:
 *           type: string
 *         description: Buscar por email (parcial)
 *       - in: query
 *         name: telefone
 *         schema:
 *           type: string
 *         description: Buscar por telefone (parcial)
 *     responses:
 *       200:
 *         description: Resultados da busca
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Membro'
 *                 total:
 *                   type: integer
 *                 filters:
 *                   type: object
 */
router.get('/search', MembroController.search);

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
 *         description: Membro não encontrado
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
 *         description: Dados inválidos
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
 *         description: Dados inválidos
 *       404:
 *         description: Membro não encontrado
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
 *         description: Membro não encontrado
 */
router.delete('/:id', MembroController.delete);

export default router;