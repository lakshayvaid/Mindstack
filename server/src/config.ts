import dotenv from 'dotenv'

dotenv.config();

export const JWT_SECRET=process.env.JWT_SECRET!;
export const Frontend_url=process.env.FRONTEND_URL!;