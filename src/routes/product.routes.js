import { Router } from "express";

import {
  convertTocsv,
  csvProcessStatus,
  csvProductsUpload,
} from "../controllers/product.controller.js";

import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

/**
 * @swagger
 * /api/v1/products/process-csv:
 *   post:
 *     summary: Uploads a CSV file containing product data.
 *     tags:
 *       - Products
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               csvFile:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Product processing started
 *       500:
 *         description: Error processing CSV
 */
router.route("/process-csv").post(upload.single("csvFile"), csvProductsUpload);

/**
 * @swagger
 * /api/v1/products/process-status:
 *   get:
 *     summary: Retrieves the processing status of products based on csvId.
 *     tags:
 *       - Products
 *     parameters:
 *       - in: query
 *         name: csvId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product processing status fetched successfully
 *       500:
 *         description: Error fetching processing status
 */
router.route("/process-status").get(csvProcessStatus);

/**
 * @swagger
 * /api/v1/products/download-csv:
 *   get:
 *     summary: Downloads a CSV file with processed product data.
 *     tags:
 *       - Products
 *     parameters:
 *       - in: query
 *         name: csvId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: CSV file for download
 *       500:
 *         description: Error generating CSV
 */
router.route("/download-csv").get(convertTocsv);

export default router;
