import { Router } from 'express';
import { getPrd, updatePrd } from '../services/prdService';

export const prdRoutes = Router();

prdRoutes.get('/', getPrd);
prdRoutes.put('/', updatePrd);
