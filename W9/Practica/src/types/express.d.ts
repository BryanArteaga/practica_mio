import { Request } from 'express';
import { usuario } from '../data/schema'; 

declare global {
    namespace Express {
        interface Request {
            user?: Usuario; 
        }
    }
}