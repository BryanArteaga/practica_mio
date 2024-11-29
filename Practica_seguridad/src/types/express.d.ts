import { Request } from 'express';
import { usuario } from '../schema'; 

declare global {
    namespace Express {
        interface Request {
            user?: Usuario; 
        }
    }
}