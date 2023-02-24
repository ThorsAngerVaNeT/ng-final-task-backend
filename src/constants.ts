import * as dotenv from 'dotenv';
dotenv.config()

export const { DB_USERNAME, DB_PASSWORD, CLUSTER_URL, PORT, SECRET_KEY, CLOUDINARY_URL } = process.env;

export const CLOUDINARY_FOLDER_NAME = process.env.CLOUDINARY_FOLDER_NAME ?? '';