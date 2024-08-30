import { Router } from "express";

import {
  convertTocsv,
  csvProcessStatus,
  csvProductsUpload,
} from "../controllers/product.controller.js";

import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/process-csv").post(upload.single("csvFile"), csvProductsUpload);
router.route("/process-status").get(csvProcessStatus);
router.route("/download-csv").get(convertTocsv);

export default router;
