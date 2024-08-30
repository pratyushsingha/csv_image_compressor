import { Router } from "express";
import { healthCheck } from "../controllers/healthcheck.controller.js";

const router = Router();

/**
 * @swagger
 * /api/v1/healthcheck:
 *   get:
 *     summary: Check the health status of the API.
 *     tags:
 *       - Healthcheck
 *     responses:
 *       200:
 *         description: API is healthy
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: 'ok'
 *       500:
 *         description: Internal server error
 */

router.route("/").get(healthCheck);

export default router;
