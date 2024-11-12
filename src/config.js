import {config} from 'dotenv'
config()

export const DB_HOST=process.env.DB_HOST || 'localhost'
export const DB_DATABASE=process.env.DB_DATABASE || 'db_curso20242'
export const DB_USER=process.env.DB_USER || 'root'
export const DB_PASSWORD=process.env.DB_PASSWORD || ''
export const DB_PORT=process.env.DB_PORT || 3306
export const PORT=process.env.PORT || 3000

export const JWT_SECRET = process.env.JWT_SECRET || 'default_secret'; // Nueva variable para JWT

export const CLOUDINARY_CLOUD_NAME=process.env.CLOUDINARY_CLOUD_NAME || 'dqxjdfncz'
export const CLOUDINARY_API_KEY=process.env.CLOUDINARY_CLOUD_NAME || '972776657996249'
export const CLOUDINARY_API_SECRET=process.env.CLOUDINARY_CLOUD_NAME || '5F2PB9yT5_xycNG_vKyegoOoMc8'
console.log()