# csv_image_compressor

A system to efficiently process image data from CSV files

## Features

- **CSV Upload**: Upload a CSV file containing product data, including image URLs.
- **Image Processing**: Automatically process and upload images to Cloudinary in the background.
- **Processing Status**: Check the processing status of the uploaded products.
- **CSV Download**: Download a CSV file with the processed product data, including input and output image URLs.

## Technologies Used

- **Node.js**
- **Express**
- **MongoDB**
- **Cloudinary**

## Installation

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/pratyushsingha/csv_image_compressor
   cd csv_image_compressor
   ```

2. **Install all Dependencies**
   ```bash
   npm install
   ```
3. **Change the `.env.sample` file to `.env` & Fill the Required Fields**

4. **Start the Development Server**
   ```bash
   npm run dev
   ```

## Postman Collection

[Postman Collection](https://documenter.getpostman.com/view/25760346/2sAXjKbYPh)

## Swagger Docs

[csv_image_compressor Docs](https://img-compressor-backend.pratyushsinga.me/api/v1/docs/)