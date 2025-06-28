/**
 * @swagger
 * tags:
 *   name: Pets
 *   description: Gestión de mascotas
 *
 * /api/pets:
 *   get:
 *     summary: Obtener todas las mascotas
 *     tags: [Pets]
 *     responses:
 *       200:
 *         description: Lista de mascotas
 *   post:
 *     summary: Crear una nueva mascota
 *     tags: [Pets]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - specie
 *             properties:
 *               name:
 *                 type: string
 *               specie:
 *                 type: string
 *               age:
 *                 type: number
 *     responses:
 *       201:
 *         description: Mascota creada
 */
