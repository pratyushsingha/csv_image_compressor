import fs from "fs";
import csv from "csv-parser";
import { nanoid } from "nanoid";
import { parse } from "json2csv";

import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { cloudinaryUpload } from "../utils/cloudinary.js";
import { Product } from "../../models/product.model.js";

const csvProductsUpload = asyncHandler(async (req, res) => {
  const csvFile = req.file.path;
  const csvData = [];

  fs.createReadStream(csvFile)
    .pipe(csv())
    .on("data", (data) =>
      csvData.push({
        serialNumber: data["S. No."],
        productName: data["Product Name"],
        inputImageUrls: data["Input Image Urls"],
      })
    )
    .on("end", async () => {
      try {
        const csvId = nanoid(10);
        const products = await Promise.all(
          csvData.map(async (row) => {
            const { serialNumber, productName, inputImageUrls } = row;
            const inputImageUrlsArray = inputImageUrls.split(",");

            const product = new Product({
              csvId,
              slNo: serialNumber,
              productName: productName,
              inputImgUrls: inputImageUrlsArray,
              outputImgUrls: [],
            });

            await product.save();
            return product;
          })
        );

        fs.unlinkSync(csvFile);
        processImagesInBackground(products);

        return res.status(200).json(
          new ApiResponse(
            200,
            {
              csvId,
              status: "pending",
            },
            "Product processing started"
          )
        );
      } catch (error) {
        console.error("Error processing CSV:", error);
        return res
          .status(500)
          .json(new ApiResponse(500, "Error processing CSV"));
      }
    });
});

const processImagesInBackground = async (products) => {
  try {
    for (const product of products) {
      const outputImageUrls = await Promise.all(
        product.inputImgUrls.map(async (url) => {
          const result = await cloudinaryUpload(url.trim());
          return result.secure_url;
        })
      );

      product.outputImgUrls = outputImageUrls;
      product.status = "completed";
      await product.save();
    }
  } catch (error) {
    console.error("Error in background image processing:", error);
    return res
      .status(500)
      .json(new ApiResponse(500, "Error in background image processing"));
  }
};

const csvProcessStatus = asyncHandler(async (req, res) => {
  const { csvId } = req.query;
  const status = await Product.find({ csvId }).select("slNo csvId status");

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        status,
        "Product processing status fetched successfully"
      )
    );
});

const convertTocsv = asyncHandler(async (req, res) => {
  const { csvId } = req.query;

  const products = await Product.find({ csvId }).select(
    "slNo productName inputImgUrls outputImgUrls"
  );

  const productsIncsvFormat = products.map((product) => ({
    "S. No.": product.slNo,
    "Product Name": product.productName,
    "Input Image Urls": Array.isArray(product.inputImgUrls)
      ? product.inputImgUrls.join(", ")
      : product.inputImgUrls,
    "Output Image Urls": Array.isArray(product.outputImgUrls)
      ? product.outputImgUrls.join(", ")
      : product.outputImgUrls,
  }));

  const fields = [
    { label: "S. No.", value: "S. No." },
    { label: "Product Name", value: "Product Name" },
    { label: "Input Image Urls", value: "Input Image Urls" },
    { label: "Output Image Urls", value: "Output Image Urls" },
  ];
  const csvFile = parse(productsIncsvFormat, { fields });

  res.setHeader("Content-Disposition", 'attachment; filename="data.csv"');
  res.setHeader("Content-Type", "text/csv");
  res.status(200).send(csvFile);
});
export { csvProductsUpload, csvProcessStatus, convertTocsv };
